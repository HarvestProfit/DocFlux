import DocFlux from './DocFlux';
import Wrapper from './TestWrapper';

/**
 * Used to test Document components using the shallow command.  This will only
 * render the imediate component.
 * @module DocFluxTest
 */
export default class DocFluxTest extends DocFlux {
  static mount(component, parser) {
    return DocFlux.render(component, parser);
  }

  static shallow(component, parser, nest = true) {
    if (!parser) return new Wrapper();
    const parent = DocFlux;
    const self = DocFluxTest;
    const shallowFunc = (c, p) => self.shallow(c, p, nest);
    const shallowEndNestFunc = (c, p) => self.shallow(c, p, false);
    if (component === undefined || component === null) return new Wrapper();

    if (parent.isDOMNode(component) && parser) {
      const tree = shallowFunc(component.props.children, parser);
      return new Wrapper(component, tree);
    }

    // Clean arrays and render items.
    if (parent.isArray(component)) {
      const tree = parent.renderComponentArray(component, parser, shallowFunc);
      return tree;
    }

    // Render components
    if (parent.isComponent(component)) {
      if (component.stringNodeName) {
        let tree = parent.renderComponent(component, parser, shallowFunc);
        if (tree.ref) {
          tree = new Wrapper(tree);
        }
        return new Wrapper(component, tree);
      }

      if (nest) {
        const tree = parent.renderComponent(component, parser, shallowEndNestFunc);
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
