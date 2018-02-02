/**
 * A component is simply a React style component with props types and default props.
 * @module Component
 */
export default class Component {
  /**
   * Prop types for validation
   * @static
   */
  static propTypes = {};

  /**
   * Default props
   * @static
   */
  static defaultProps = {};

  constructor(props = {}) {
    this.props = props;
  }

  /**
   * Renders the component
   * @static
   * @function
   * @abstract
   */
  render() { return null; }
}
