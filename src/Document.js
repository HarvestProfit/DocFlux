import DocFlux from './DocFlux';

/**
 * A Document is a wrapper to a component where you can call the create method to
 * create the document object.  Generally you will inherit from this class to create
 * document type specific Documents.  This class will create the root component, render
 * the component tree, then transform the component tree passing a document builder object
 * created in `createDocument`.  It will return the document builder object afterwards.
 * @module Document
 */
export default class Document {
  /**
   * The component to render
   * @static
   * @abstract
   */
  static component = null;

  /**
   * Creates the document builder for transforming
   * @static
   * @function
   * @abstract
   */
  static createBuilder = () => null;

  /**
   * Creates the document from the document builder.  This
   * Gets returned on create.
   * @static
   * @function
   * @abstract
   */
  static createDocument = () => null;

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

  /**
   * Creates a document
   * @static
   * @function
   * @param {object} initialProps The props to pass to the component
   * @return {object} The document generated
   */
  static create(initialProps) {
    const props = DocFlux.parseProps(initialProps, this.defaultProps);
    DocFlux.validateProps(props, this.propTypes, this.constructor.name);

    const component = {
      node: this.component,
      props,
    };

    const DOM = DocFlux.render(component, this.parser);
    const doc = DocFlux.transform(DOM, this.createBuilder(props));
    return this.createDocument(doc, props);
  }
}
