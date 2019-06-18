import PropTypes from 'prop-types';
import DOMComponent from '../../src/DOMComponent';
/**
 * A super generic DOM Node
 */
export class TestNode extends DOMComponent {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.any).isRequired,
  }

  render() {
    return this.props.children;
  }

  static transform(DOM, variables = {}) {
    const stack = [];
    for (let i = 0; i < DOM.value.length; i += 1) {
      const child = DOM.value[i];
      if (typeof child === 'number') {
        stack.push(child.toString());
      } else if (typeof child === 'string') {
        stack.push(child);
      } else if (child.ref) {
        stack.push(child.ref.constructor.transform(child, variables));
      }
    }

    return stack;
  }
}

export default {
  h1: TestNode,
  ul: TestNode,
  li: TestNode,
};
