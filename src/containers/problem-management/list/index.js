import React from "react";
import {Button} from "antd";
import Tabs from "../../../components/tabs";
import CreateProblemContainer from "../create-problem";

class ProblemListContainer extends React.Component {
    state = {
        activeTabPaneKey: 'problem-management',
        tabPaneList: []
    };

    onCreateProblem = () => {
        this.setState({
            tabPaneList: [
                ...this.state.tabPaneList,
                <Tabs.TabPane tab='新建问题' key={`create-problem-${new Date().getTime()}`} closable={true}>
                    <CreateProblemContainer />
                </Tabs.TabPane>
            ],
            activeTabPaneKey: 'create-problem'
        })
    };

    onTabPaneRemove = targetKey => {
        let { activeKey } = this.state;
        let lastIndex;
        this.state.tabPaneList.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.tabPaneList.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key;
            } else {
                activeKey = panes[0].key;
            }
        }
        this.setState({ tabPaneList: panes, activeKey });
    };

    getTabPaneList = () => {
        return [
            <Tabs.TabPane tab='问题管理' key='problem-management' closable={false}>
                <Button onClick={this.onCreateProblem}>新建问题</Button>
            </Tabs.TabPane>,
            ...this.state.tabPaneList,
        ];
    };

    render() {
        return (
            <Tabs activeKey={this.state.activeTabPaneKey} onTabPaneRemove={this.onTabPaneRemove} panes={this.getTabPaneList()}/>
        );
    }
}

export default ProblemListContainer;
