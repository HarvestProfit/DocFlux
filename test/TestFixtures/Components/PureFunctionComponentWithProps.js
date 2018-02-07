import PropTypes from 'prop-types';
import { DocFlux } from '../../../src';
/** @jsx DocFlux.createElement */

// Component with props
const TestComponent = props => (
  <div>
    <h1>{props.title} - {props.count}</h1>
  </div>
);

TestComponent.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number,
};

TestComponent.defaultProps = {
  count: 1,
};

export default TestComponent;
