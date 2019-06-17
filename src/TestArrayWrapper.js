import { findNodes, flattenText } from './TestHelpers';

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

  find(elementOrComponent) {
    return new ArrayWrapper(findNodes(elementOrComponent, this));
  }

  text() {
    return flattenText(this);
  }

  first() {
    return this.at(0);
  }

  last() {
    return this.at(this.length - 1);
  }

  at(index) {
    if (index >= 0 && index <= this.length - 1) {
      return this.tree[index];
    }
    return null;
  }
}
