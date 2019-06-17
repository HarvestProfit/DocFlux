import { findNodes, flattenText } from './TestHelpers';
import ArrayWrapper from './TestArrayWrapper';

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

  find(elementOrComponent) {
    return new ArrayWrapper(findNodes(elementOrComponent, this));
  }

  text() {
    return flattenText(this);
  }
}
