import { DocFlux } from '../src';
/** @jsx DocFlux.createElement */

import Parser from './TestFixtures/Parser';
import SimpleComponent from './TestFixtures/Components/SimpleComponent';
import SimplePureFunctionComponent from './TestFixtures/Components/SimplePureFunctionComponent';
import ComponentWithChildren from './TestFixtures/Components/ComponentWithChildren';
import ComponentWithProps from './TestFixtures/Components/ComponentWithProps';
import PureFunctionComponentWithProps from './TestFixtures/Components/PureFunctionComponentWithProps';

// eslint-disable-next-line no-console
console.error = jest.fn((error) => {
  throw new Error(error);
});

describe('DocFlux', () => {
  describe('render', () => {
    it('should render a DOM node', () => {
      const component = DocFlux.render(<h1>HEY</h1>, Parser);
      expect(component.ref instanceof Parser.h1).toBe(true);
      expect(component.value).toBe('HEY');
    });

    it('should render an empty div', () => {
      const component = DocFlux.render(<div />, Parser);
      expect(component.constructor).toBe(Array);
    });

    it('should render a div with an h1 in it', () => {
      const component = DocFlux.render(<div><h1>Hey</h1></div>, Parser);
      expect(component.constructor).toBe(Array);
      const h1 = component[0];
      expect(h1.ref instanceof Parser.h1).toBe(true);
      expect(h1.value).toBe('Hey');
    });

    it('should render a Component', () => {
      const component = DocFlux.render(<SimpleComponent />, Parser);
      expect(component.constructor).toBe(Array);
      const h1 = component[0];
      expect(h1.ref instanceof Parser.h1).toBe(true);
      expect(h1.value).toBe('Hey');
    });

    it('should render a Pure Function Component', () => {
      const component = DocFlux.render(<SimplePureFunctionComponent />, Parser);
      expect(component.constructor).toBe(Array);
      const h1 = component[0];
      expect(h1.ref instanceof Parser.h1).toBe(true);
      expect(h1.value).toBe('Hey');
    });

    it('should render a div with a Component', () => {
      const component = DocFlux.render(<div><SimpleComponent /></div>, Parser);
      expect(component.constructor).toBe(Array);
      const innerDiv = component[0];
      expect(innerDiv.constructor).toBe(Array);
      const h1 = innerDiv[0];
      expect(h1.ref instanceof Parser.h1).toBe(true);
      expect(h1.value).toBe('Hey');
    });

    it('should render a div with a Component with children', () => {
      const component = DocFlux.render(
        <div>
          <ComponentWithChildren>Hey</ComponentWithChildren>
        </div>, Parser);

      expect(component.constructor).toBe(Array);
      expect(component[0][0]).toBe('Hey');
    });

    it('should render a Component with children', () => {
      const component = DocFlux.render(
        <ComponentWithChildren>
          <h1>Hey</h1>
          <h1>You</h1>
        </ComponentWithChildren>, Parser);

      expect(component[0].ref instanceof Parser.h1).toBe(true);
      expect(component[0].value).toBe('Hey');
      expect(component[1].ref instanceof Parser.h1).toBe(true);
      expect(component[1].value).toBe('You');
    });
  });

  describe('createElement', () => {
    it('should create a DOMNode', () => {
      const component = (<div />);
      expect(DocFlux.isDOMNode(component)).toBe(true);
    });

    it('should create a Component as a pure function', () => {
      const component = (<SimplePureFunctionComponent />);
      expect(DocFlux.isComponent(component)).toBe(true);
    });

    it('should create a Component', () => {
      const component = (<SimpleComponent />);
      expect(DocFlux.isComponent(component)).toBe(true);
    });

    it('should set children to props', () => {
      const component = (<div>HEY</div>);
      expect(component.props.children).toEqual(['HEY']);
    });
  });

  describe('propTypes', () => {
    it('should create a Component and fail prop types', () => {
      expect(() => {
        DocFlux.render(<ComponentWithProps />, Parser);
      }).toThrow();
    });

    it('should create a Component with valid prop types', () => {
      DocFlux.render(<ComponentWithProps title="test string" />, Parser);
    });

    it('should create a Pure Function Component and fail prop types', () => {
      expect(() => {
        DocFlux.render(<PureFunctionComponentWithProps />, Parser);
      }).toThrow();
    });

    it('should create a Pure Function Component with valid prop types', () => {
      DocFlux.render(<PureFunctionComponentWithProps title="test string" />, Parser);
    });
  });

  describe('props', () => {
    it('should create a Component with all props and default props set up', () => {
      const component = DocFlux.render(<ComponentWithProps title="test string" />, Parser);
      expect(component[0].value).toBe('test string - 1');
    });

    it('should create a Pure Function Component with all props and default props set up', () => {
      const component = DocFlux.render(<PureFunctionComponentWithProps title="test string" />, Parser);
      expect(component[0].value).toBe('test string - 1');
    });

    it('should return only the props provided', () => {
      const props = {
        test: 1,
      };

      const generatedProps = DocFlux.parseProps(props, {});
      expect(generatedProps).toEqual(props);
    });

    it('should return props provided with defaults filled', () => {
      const props = {
        test: 1,
      };

      const defaultProps = {
        otherTest: 1,
      };

      const generatedProps = DocFlux.parseProps(props, defaultProps);
      expect(generatedProps.test).toEqual(1);
      expect(generatedProps.otherTest).toEqual(1);
      expect(Object.keys(generatedProps)).toEqual(expect.arrayContaining(['test', 'otherTest']));
    });
  });

  describe('matchers', () => {
    it('should match DOM nodes', () => {
      const component = (<div />);
      expect(DocFlux.isDOMNode(component)).toBe(true);
    });

    it('should match DOM components', () => {
      const component = (<h1>HEY</h1>);
      const resolvedDOMNode = DocFlux.resolveDOMNode(component, Parser);
      expect(DocFlux.isComponent(resolvedDOMNode)).toBe(true);
    });

    it('should match class based components', () => {
      const component = (<SimpleComponent />);
      expect(DocFlux.isComponent(component)).toBe(true);
    });

    it('should match pure function components', () => {
      const component = (<SimplePureFunctionComponent />);
      expect(DocFlux.isComponent(component)).toBe(true);
    });
  });

  describe('transform', () => {
    it('should transform the DOM', () => {
      const DOM = DocFlux.render(
        <div>
          <h1>Hey</h1>
        </div>,
        Parser,
      );

      const result = DocFlux.transform(DOM, {});
      expect(result).toEqual('Hey');
    });
  });
});
