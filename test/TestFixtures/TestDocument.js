import PropTypes from 'prop-types';
import { Document } from '../../src';
import Parser from './Parser';

export default class TestDocument extends Document {
  static propTypes = {
    name: PropTypes.string.isRequired,
    optional: PropTypes.string,
  }

  static defaultProps = {
    optional: 'default',
  }

  static parser = Parser;
  static createDocument(doc, props) {
    return {
      name: props.name,
      props,
      doc,
    };
  }

  static createBuilder() {
    return {};
  }
}
