import React from "react";
import {Button} from "antd";
import Tabs from "../../../components/tabs";

class ProblemListContainer extends React.Component {
    onCreateProblem = () => {

    };

    render() {
        return (
            <Tabs>
                <Tabs.TabPane tab='问题管理' key='problem-management' closable={false}>
                    <Button onClick={this.onCreateProblem}>新建问题</Button>
                </Tabs.TabPane>
            </Tabs>
        );
    }
}

export default ProblemListContainer;
