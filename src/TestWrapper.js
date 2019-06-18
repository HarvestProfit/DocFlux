import { findNodes, flattenText } from './TestHelpers';
import ArrayWrapper from './TestArrayWrapper';

/**
 * For tests, this will be wrapped around each rendered component.  This allows
 * for exposing additional test helping code.
 * @module Wrapper
 */
export default class Wrapper {
  constructor(component = {}, tree = []) {
    this.component = component;
    this.node = component.node || component.stringNodeName;
    if (Array.isArray(tree)) {
      this.tree = tree;
    } else {
      this.tree = [tree];
    }
  }

  /**
   * Will search the rendered tree for a tag name or a component name.
   * @function
   * @param {Component|string} elementOrComponent A String DOM name or Component
   * @return {ArrayWrapper} A wrapper containing the results of the search.
   */
  find(elementOrComponent) {
    return new ArrayWrapper(findNodes(elementOrComponent, this));
  }

  /**
   * Will find all text in the tree and return a flattened version of it.
   * @function
   * @return {string} All of the text contained in the tree
   */
  text() {
    return flattenText(this);
  }
}
