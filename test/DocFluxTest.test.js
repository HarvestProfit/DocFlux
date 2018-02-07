import { DocFluxTest } from '../src';
/** @jsx DocFluxTest.createElement */

import Parser from './TestFixtures/Parser';
import SimpleComponent from './TestFixtures/Components/SimpleComponent';
import ComponentWithChildren from './TestFixtures/Components/ComponentWithChildren';

describe('DocFluxTest', () => {
  describe('shallow', () => {
    it('should render only the root component', () => {
      const component = DocFluxTest.shallow(
        <ComponentWithChildren>
          <SimpleComponent />
        </ComponentWithChildren>,
        Parser,
      );

      expect(component.constructor).toBe(Array);
      expect(component[0].node).toBe(SimpleComponent);
    });

    it('should render the entire component as it has no internal components', () => {
      const component = DocFluxTest.shallow(
        <ComponentWithChildren>
          <h1>Hey</h1>
        </ComponentWithChildren>,
        Parser,
      );

      expect(component.constructor).toBe(Array);
      expect(component[0].value).toBe('Hey');
    });
  });
});
