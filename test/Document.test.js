import TestDocument from './TestFixtures/TestDocument';
import { DocFlux } from '../src';
/** @jsx DocFlux.createElement */

const DocComponent = () => (
  <div><h1 style={{ color: 'red' }}>Hey</h1></div>
);

class Doc extends TestDocument {
  static component = DocComponent;
}

describe('Document', () => {
  describe('create', () => {
    it('should create the test document', () => {
      const props = {
        name: 'test document',
      };

      const doc = Doc.create(props);
      expect(doc.name).toBe('test document');
      expect(doc.props.optional).toBe('default');
      expect(doc.doc).toEqual(['Hey']);
    });
  });
});
