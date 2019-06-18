import { findNodes, flattenText } from './TestHelpers';

/**
 * For tests, this will be wrapped around each list of rendered components resulting from a
 * call to `find`.  This allows for exposing additional test helping code.
 * @module Wrapper
 */
export default class ArrayWrapper {
  constructor(results = []) {
    this.component = { props: {} };
    if (Array.isArray(results)) {
      this.tree = results;
    } else {
      this.tree = [results];
    }
    this.isArray = true;
    this.length = this.tree.length;
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

  /**
   * Returns the first item in the tree
   * @function
   * @return {Wrapper|null} A component Test Wrapper, null if none
   */
  first() {
    return this.at(0);
  }

  /**
   * Returns the last item in the tree
   * @function
   * @return {Wrapper|null} A component Test Wrapper, null if none
   */
  last() {
    return this.at(this.length - 1);
  }

  /**
   * Returns the item at the specified index in the tree
   * @function
   * @param {number} index The index to pull from
   * @return {Wrapper|null} A component Test Wrapper, null if not found
   */
  at(index) {
    if (index >= 0 && index <= this.length - 1) {
      return this.tree[index];
    }
    return null;
  }
}
