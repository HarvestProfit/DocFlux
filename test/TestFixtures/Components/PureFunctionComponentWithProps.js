import PropTypes from 'prop-types';
import { DocFlux } from '../../../src';
/** @jsx DocFlux.createElement */

// Component with props
const PureFunctionComponentWithProps = props => (
  <div>
    <h1>{props.title} - {props.count}</h1>
  </div>
);

PureFunctionComponentWithProps.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number,
};

PureFunctionComponentWithProps.defaultProps = {
  count: 1,
};

export default PureFunctionComponentWithProps;
