import { DocFluxTest } from '../src';
/** @jsx DocFluxTest.createElement */

import Parser from './TestFixtures/Parser';
import SimpleComponent from './TestFixtures/Components/SimpleComponent';
import ComponentWithChildren from './TestFixtures/Components/ComponentWithChildren';
import ListComponent from './TestFixtures/Components/ListComponent';

describe('DocFluxTest', () => {
  describe('shallow', () => {
    it('should render only the root component', () => {
      const component = DocFluxTest.shallow(
        <ComponentWithChildren>
          <SimpleComponent />
          <SimpleComponent />
        </ComponentWithChildren>,
        Parser,
      );

      expect(component.find(ComponentWithChildren).length).toEqual(1);
      expect(component.find(SimpleComponent).length).toEqual(2);
    });

    it('should render the entire component as it has no internal components', () => {
      const component = DocFluxTest.shallow(
        <ComponentWithChildren>
          <h1>Hey</h1>
        </ComponentWithChildren>,
        Parser,
      );

      expect(component.text()).toBe('Hey');
    });

    it('should find list of nodes', () => {
      const component = DocFluxTest.shallow(
        <ul>
          <li>One</li>
          <li>Two</li>
          <li>Three</li>
          <ListComponent />
        </ul>
        ,
        Parser,
      );

      expect(component.find('li').length).toEqual(4);
      expect(component.find(ListComponent).length).toEqual(1);
      expect(component.text()).toContain('Three');
      expect(component.find('li').first().text()).toEqual('One');
      expect(component.find('li').at(1).text()).toEqual('Two');
      expect(component.find('li').at(2).text()).toEqual('Three');
      expect(component.find('li').last().text()).toEqual('List Component!!');
    });

    it('should find list of nodes wrapped in a component', () => {
      const component = DocFluxTest.shallow(
        <ComponentWithChildren>
          <ul>
            <li>One</li>
            <li>Two</li>
            <li>Three</li>
            <ListComponent />
          </ul>
        </ComponentWithChildren>
        ,
        Parser,
      );

      expect(component.find('li').length).toEqual(3);
      expect(component.find(ListComponent).length).toEqual(1);
    });

    it('should support arrays and numbers', () => {
      const component = DocFluxTest.shallow(
        <ul>
          <li>{1}</li>
          <li>{2}</li>
          <li>{3}</li>
        </ul>
        ,
        Parser,
      );
      expect(component.find('li').text()).toContain('1');
      expect(component.find('li').text()).toContain('2');
      expect(component.find('li').text()).toContain('3');
    });
  });
});
