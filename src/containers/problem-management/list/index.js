import React from 'react';
import { Button } from 'antd';
import * as PropTypes from 'prop-types';
import CreateProblemContainer from '../create';
import { createTabContainer } from '../../base/TabContainer';

class ProblemListContainer extends React.Component {
  onCreateProblem = () => {
    this.props.addTabPane(CreateProblemContainer, { tab: '新建问题', closable: true });
  };

  render() {
    return (
      <Button onClick={this.onCreateProblem}>新建问题</Button>
    );
  }
}

ProblemListContainer.propTypes = {
  addTabPane: PropTypes.func,
};

export default createTabContainer(ProblemListContainer, { tab: '问题列表', closable: false });
