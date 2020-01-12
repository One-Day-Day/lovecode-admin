import React from 'react';
import {Button} from 'antd';
import CreateProblemContainer from '../create';
import {createTabContainer} from '../../base/TabContainer';

class ProblemListContainer extends React.Component {

    onCreateProblem() {
        this.props.addTabPane(CreateProblemContainer, {tab: '新建问题', closable: true});
    };

    render () {
        return (
            <Button onClick={this.onCreateProblem.bind(this)}>新建问题</Button>
        );
    }
}

export default createTabContainer(ProblemListContainer, {tab: '问题列表', closable: false});
