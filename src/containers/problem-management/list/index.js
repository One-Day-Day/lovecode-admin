import React from "react";
import {Button} from "antd";
import Tabs from "../../../components/tabs";
import CreateProblemContainer from "../create";
import TabContainer from "../../base/TabContainer";

class ProblemListContainer extends TabContainer {

    getDefaultActiveKey = () => 'problem-list';

    onCreateProblem = () => {
        const paneKey = `create-problem-${new Date().getTime()}`;
        this.addPane(
            <Tabs.TabPane tab='新建问题' key={paneKey} closable={true}>
                <CreateProblemContainer />
            </Tabs.TabPane>
        );
    };

    getDefaultPane = () => {
        return [
            <Tabs.TabPane tab='问题列表' key='problem-list' closable={false}>
                <Button onClick={this.onCreateProblem}>新建问题</Button>
            </Tabs.TabPane>
        ];
    }
}

export default ProblemListContainer;
