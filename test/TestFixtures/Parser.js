import PropTypes from 'prop-types';
import { DOMComponent } from '../../src';


class H1 extends DOMComponent {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.any).isRequired,
  }

  render() {
    let text = this.props.children.join('');
    if (text.length < 1) {
      text = ' ';
    }
    return text;
  }

  static transform(DOM) {
    return DOM.value;
  }
}

export default {
  h1: H1,
};
