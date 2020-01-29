import React from 'react';
import { Button } from 'antd';
import * as PropTypes from 'prop-types';
import CreateProblemContainer from '../create';

class ProblemListContainer extends React.Component {
  onCreateProblem = () => {
    this.props.manager.addTabPane({
      component: CreateProblemContainer,
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
  manager: PropTypes.shape({
    addTabPane: PropTypes.func,
  }),
};


export default ProblemListContainer;
