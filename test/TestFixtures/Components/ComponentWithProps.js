import PropTypes from 'prop-types';
import { DocFlux, Component } from '../../../src';
/** @jsx DocFlux.createElement */

// class based component with props
export default class TestComponent extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    count: PropTypes.number,
  };

  static defaultProps = {
    count: 1,
  };

  renderTitle() {
    return (
      <h1>{this.props.title} - {this.props.count}</h1>
    );
  }

  render() {
    return (
      <div>
        {this.renderTitle()}
      </div>
    );
  }
}
