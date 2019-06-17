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
    return text.trim();
  }

  static transform(DOM) {
    return DOM.value;
  }
}

class Li extends DOMComponent {
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

class Ul extends DOMComponent {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.any).isRequired,
  }

  render() {
    return this.props.children;
  }

  static transform(DOM) {
    const stack = [];
    for (let i = 0; i < DOM.value.length; i += 1) {
      const child = DOM.value[i];
      if (child.ref) {
        stack.push(child.ref.constructor.transform(child));
      }
    }
    return stack;
  }
}

export default {
  h1: H1,
  ul: Ul,
  li: Li,
};
