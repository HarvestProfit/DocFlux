import Component from './Component';
import DOMComponent from './DOMComponent';
import Document from './Document';

import DocFlux from './DocFlux';
import DocFluxTest from './DocFluxTest';

export {
  Component,
  DOMComponent,
  Document,
  DocFlux,
  DocFluxTest,
};

export function shallow(component) {
  return DocFluxTest.shallow(component);
}

export default DocFlux;
