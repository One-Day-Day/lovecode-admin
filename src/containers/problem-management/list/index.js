import React from 'react';
import { Button } from 'antd';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CreateProblemContainer from '../create';
import { addTabPane } from '../../../actions/tabs';

class ProblemListContainer extends React.Component {
  onCreateProblem = () => {
    this.props.manager.addTabPane({
      render: () => <CreateProblemContainer />,
      options: { tab: '新建问题', closable: true },
    });
  };

  render() {
    return (
      <Button onClick={this.onCreateProblem}>新建问题</Button>
    );
  }
}

ProblemListContainer.propTypes = {
  addTabPane: PropTypes.func,
  manager: PropTypes.object,
};

const mapStateToProps = () => ({});
const mapDispatchToProps = {
  addTabPane,
};
export default connect(mapStateToProps, mapDispatchToProps)(ProblemListContainer);
