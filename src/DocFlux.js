import _ from 'lodash';
import PropTypes from 'prop-types';
import Component from './Component';
import DOMComponent from './DOMComponent';

/**
 * Used as a standard grouping component.  If detected, it should keep
 * the array of values it returns, rather than returning the contents.
 * This is overrideable if a Dic component is defined in the parser.
 * @module Div
 */
class Div extends Component {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.any).isRequired,
  }

  render() {
    return this.props.children;
  }
}

// Returns a value or default value
const setValue = (value, defaultValue) => {
  if (value === undefined) {
    return defaultValue;
  }
  return value;
};

// Used to filter out invalid rendered items.
const isValidSubValue = value => (value !== undefined && value !== null);

/**
 * Doc Flux allows for creating a structure from a React style component system.
 * Given a parser and DOM components, you can generate a DOM and apply transforms
 * for the DOM.  This can virtually be used to render anything from a PDF to a JSON
 * document.
 * To use with JSX, simply import this package into the file and set the jsx
 * with a comment `@jsx DocFlux.createElement`
 * @module DocFlux
 */
export default class DocFlux {
  // Parses the props and applies defaults.  Does not support nesting.
  static parseProps(suppliedProps, defaultProps = {}) {
    const props = {
      ...defaultProps,
    };

    Object.keys(suppliedProps).forEach((key) => {
      props[key] = setValue(suppliedProps[key], defaultProps[key]);
    });
    return props;
  }

  // Validates the props given the prop types.
  static validateProps(props, propTypes, componentName) {
    PropTypes.checkPropTypes(propTypes, props, 'prop', componentName);
  }

  /**
   * Transforms JSX into parsable elements
   * @static
   * @function
   * @param {Component|string} JSXComponent A String DOM name or Component
   * @return {object} The component to render with props
   */
  static createElement(JSXComponent, props, ...children) {
    const propsWithChildren = { ...props };
    if (children) {
      propsWithChildren.children = _.flattenDeep(children);
    }

    return {
      node: JSXComponent,
      props: propsWithChildren,
    };
  }

  static isDOMNode(component) {
    return (typeof component.node === 'string');
  }

  static isArray(component) {
    return (component.constructor === Array);
  }

  static resolveDOMNode(component, parser) {
    let nodeComponent = parser[component.node] || null;
    if (!nodeComponent && component.node === 'div') {
      nodeComponent = Div;
    }

    return {
      node: nodeComponent,
      props: component.props,
      stringNodeName: component.node,
    };
  }

  static renderDOMNode(component, parser, renderFunc) {
    const domNode = component.node;
    const DomComponent = parser[domNode];
    if (DomComponent) {
      const props = DocFlux.parseProps(component.props, DomComponent.defaultProps);
      DocFlux.validateProps(props, DomComponent.propTypes, DomComponent.name);
      const comp = new DomComponent(props);
      return renderFunc(comp, parser);
    }
    return null;
  }

  static isComponent(component) {
    if (!component.node) return false;

    if (typeof component.node.prototype === 'function') return true;
    if (typeof component.node.prototype === 'object') return true;
    return false;
  }

  static renderComponent(component, parser, renderFunc) {
    const ComponentClass = component.node;
    const props = DocFlux.parseProps(component.props, ComponentClass.defaultProps);
    DocFlux.validateProps(props, ComponentClass.propTypes, ComponentClass.name);

    let value;
    if (ComponentClass.prototype.render) {
      const initializedComponent = new ComponentClass(props);
      value = renderFunc(initializedComponent.render(), parser);
      if (ComponentClass.transform) {
        return {
          ref: initializedComponent,
          value,
          elementName: component.stringNodeName,
          props,
        };
      }
    } else {
      value = renderFunc(ComponentClass(props), parser);
    }

    return value;
  }

  static renderComponentArray(components, parser, renderFunc) {
    const cleanedRender = components.filter(isValidSubValue);
    const renderSubComponents = cleanedRender.map(comp =>
      renderFunc(comp, parser)).filter(isValidSubValue);
    return renderSubComponents;
  }

  static isDivComponent(component) {
    return (component.node === Div);
  }

  /**
   * Generates a DOM
   * @static
   * @function
   * @param {object} component An object generated from `createElement`
   * @param {object} parser An object that contains a map between DOM nodes to DOM components
   * @return {array|object} The DOM (array if parent node is a div)
   */
  static render(component, parser) {
    if (!parser) return null;
    const self = DocFlux;
    if (component === undefined || component === null) return null;

    // console.log('render', component, self.isDOMNode(component));
    if (self.isDOMNode(component) && parser) {
      return self.render(self.resolveDOMNode(component, parser), parser);
    }

    // Clean arrays and render items.
    if (self.isArray(component)) {
      return self.renderComponentArray(component, parser, self.render);
    }

    // Render components
    if (self.isComponent(component)) {
      return self.renderComponent(component, parser, self.render);
    }

    return component;
  }

  /**
   * Transforms a DOM into a Doc
   * @static
   * @param {array|object} fluxDOM The DOM returned from `render`
   * @param {object} builder A document builder, could be a class, an object, or even null
   * @return {object} The builder object after transformation.
   */
  static transform(fluxDOM, builder) {
    let docBuilder = builder;
    if (fluxDOM.constructor === Array) {
      fluxDOM.forEach((DOM) => {
        docBuilder = DocFlux.transform(DOM, docBuilder);
      });
      return docBuilder;
    }

    if (fluxDOM.ref && fluxDOM.ref instanceof DOMComponent) {
      return fluxDOM.ref.constructor.transform(fluxDOM, docBuilder);
    }

    return docBuilder;
  }
}
