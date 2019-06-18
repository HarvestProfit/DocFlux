function nodeName(node) {
  if (typeof node === 'string') return node;
  return node.name.toString();
}

export function findNodes(elementOrComponent, currentNode) {
  if (!currentNode.isArray) {
    if (currentNode.node === undefined) return [];
    if (nodeName(elementOrComponent) === nodeName(currentNode.node)) {
      return [currentNode];
    }
  }

  let result = [];
  for (let i = 0; i < currentNode.tree.length; i += 1) {
    const currentChild = currentNode.tree[i];

    let childResult = findNodes(elementOrComponent, currentChild);
    if (childResult.constructor !== Array) {
      childResult = [childResult];
    }
    result = [
      ...result,
      ...childResult,
    ];
  }
  return result;
}

function mergeChildrenText(children) {
  return children.reduce((final, child) => {
    if (typeof child === 'string') return child + final;
    if (typeof child === 'number') return child.toString() + final;
    return final;
  }, '');
}

export function flattenText(currentNode) {
  let result = '';
  if (currentNode.component && currentNode.component.props.children) {
    const childResult = mergeChildrenText(currentNode.component.props.children);
    if (childResult.length > 0) return childResult;
  }

  for (let i = 0; i < (currentNode.tree || []).length; i += 1) {
    const currentChild = currentNode.tree[i];
    result += flattenText(currentChild);
  }
  return result;
}
