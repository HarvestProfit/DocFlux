import Component from './Component';

/**
 * A DOM Component is different than a Component in 2 ways.  First, after rendering,
 * a DOM component will show up in the rendered tree, where a Component will not.
 * Second, DOMComponents have transform rules.  This is part of the second stage
 * called via a Container where given a DOM tree, DOMComponents can write data to
 * a document builder.
 * @module DOMComponent
 * @inheritdoc
 */
export default class DOMComponent extends Component {
  /**
   * Transforms the component into a document
   * @static
   * @function
   * @abstract
   */
  static transform() {}
}
