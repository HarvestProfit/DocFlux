import DocFlux from './DocFlux';
import Wrapper from './TestWrapper';

// Used to filter out invalid rendered items.
const isValidSubValue = value => (value !== undefined && value !== null);

/**
 * Used to test Document components using the shallow command.  This will only
 * render the imediate component.
 * @module DocFluxTest
 */
export default class DocFluxTest extends DocFlux {
  static mount(component, parser) {
    return DocFlux.render(component, parser);
  }

  static renderComponentArray(components, renderFunc) {
    const cleanedRender = components.filter(isValidSubValue);
    const renderSubComponents = cleanedRender.map(comp =>
      renderFunc(comp)).filter(isValidSubValue);
    return renderSubComponents;
  }

  static renderComponent(component, renderFunc) {
    const ComponentClass = component.node;
    const props = DocFlux.parseProps(component.props, ComponentClass.defaultProps);
    DocFlux.validateProps(props, ComponentClass.propTypes, ComponentClass.name);

    let value;
    if (ComponentClass.prototype.render) {
      const initializedComponent = new ComponentClass(props);
      value = renderFunc(initializedComponent.render());
      if (ComponentClass.transform) {
        return {
          ref: initializedComponent,
          value,
          elementName: component.stringNodeName,
          props,
        };
      }
    } else {
      value = renderFunc(ComponentClass(props));
    }

    return value;
  }

  /**
   * Shallow renders only the imediate component tree
   * @static
   * @function
   * @param {Component} JSXComponent A component to shallow render
   * @return {Wrapper} A test wrapper representing the tree
   */
  static shallow(component, nest = true) {
    const parent = DocFlux;
    const self = DocFluxTest;
    const shallowFunc = c => self.shallow(c, nest);
    const shallowEndNestFunc = c => self.shallow(c, false);
    if (component === undefined || component === null) return new Wrapper();

    if (parent.isDOMNode(component)) {
      const tree = shallowFunc(component.props.children);
      return new Wrapper(component, tree);
    }

    // Clean arrays and render items.
    if (parent.isArray(component)) {
      const tree = self.renderComponentArray(component, shallowFunc);
      return tree;
    }

    // Render components
    if (parent.isComponent(component)) {
      if (component.stringNodeName) {
        let tree = self.renderComponent(component, shallowFunc);
        if (tree.ref) {
          tree = new Wrapper(tree);
        }
        return new Wrapper(component, tree);
      }

      if (nest) {
        const tree = self.renderComponent(component, shallowEndNestFunc);
        return new Wrapper(component, tree);
      }
      return new Wrapper(component);
    }

    if (component.node !== undefined) {
      throw new Error(`Undefined Node: ${component.stringNodeName}`);
    }

    return component;
  }
}
