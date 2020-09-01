import PropTypes from 'prop-types';
import { DocFlux } from '../../../src';
/** @jsx DocFlux.createElement */

// Component with children
const ComponentWithChildren = (props) => (
  <div>
    {props.children}
  </div>
);

ComponentWithChildren.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
};

export default ComponentWithChildren;
