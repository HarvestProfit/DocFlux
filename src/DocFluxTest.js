import DocFlux from './DocFlux';

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
    if (!parser) return null;
    const parent = DocFlux;
    const self = DocFluxTest;
    const shallowFunc = (c, p) => self.shallow(c, p, nest);
    const shallowEndNestFunc = (c, p) => self.shallow(c, p, false);

    if (component === undefined || component === null) return null;

    if (parent.isDOMNode(component) && parser) {
      return shallowFunc(parent.resolveDOMNode(component, parser), parser);
    }

    // Clean arrays and render items.
    if (parent.isArray(component)) {
      return parent.renderComponentArray(component, parser, shallowFunc);
    }

    // Render components
    if (parent.isComponent(component)) {
      if (component.stringNodeName) {
        return parent.renderComponent(component, parser, shallowFunc);
      }

      if (nest) {
        const val = parent.renderComponent(component, parser, shallowEndNestFunc);
        return val;
      }
    }

    return component;
  }
}
