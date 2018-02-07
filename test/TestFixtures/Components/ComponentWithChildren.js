import PropTypes from 'prop-types';
import { DocFlux } from '../../../src';
/** @jsx DocFlux.createElement */

// Component with children
const TestComponent = props => (
  <div>
    {props.children}
  </div>
);

TestComponent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
};

export default TestComponent;
