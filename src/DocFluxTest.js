import DocFlux from './DocFlux';

/**
 * Used to test Document components using the shallow command.  This will only
 * render the imediate component.
 * @module DocFluxTest
 */
export default class DocFluxTest extends DocFlux {
  static shallow(component, parser, nest = true) {
    const parent = DocFlux;
    const self = DocFluxTest;
    const shallowFunc = (c, p) => self.shallow(c, p, nest);
    const shallowEndNestFunc = (c, p) => self.shallow(c, p, false);

    if (component === undefined || component === null) return null;

    if (parent.isDOMNode(component) && parser) {
      return shallowFunc(parent.resolveDOMNode(component, parser), parser);
    }

    // Render DOM components
    if (parent.isDOMComponent(component)) {
      return parent.renderDOMComponent(component, parser, shallowFunc);
    }

    // Render components
    if (parent.isComponent(component)) {
      if (parent.isDivComponent(component)) {
        return parent.renderComponent(component, parser, shallowFunc);
      }

      if (nest) {
        return parent.renderComponent(component, parser, shallowEndNestFunc);
      }
    }

    // Render components
    if (parent.isPureFunctionComponent(component) && nest) {
      return parent.renderPureFunctionComponent(component, parser, shallowEndNestFunc);
    }

    // Clean arrays and render items.
    if (parent.isArray(component)) {
      return parent.renderComponentArray(component, parser, shallowFunc);
    }
    return component;
  }
}
