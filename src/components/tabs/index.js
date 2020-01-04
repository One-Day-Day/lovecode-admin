import React from "react";
import {Tabs as AntdTabs} from "antd";
import styles from './index.module.scss';

class Tabs extends React.Component {
    static TabPane = props => {
        return <AntdTabs.TabPane {...props}>
            <div className={styles.container}>{props.children}</div>
        </AntdTabs.TabPane>
    };

    constructor(props) {
        super(props);
        this.state = {
            activeKey: this.props.activeKey,
            panes: this.props.panes,
        }
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    remove = targetKey => {
        this.props.onTabPaneRemove(targetKey);
    };

    onTabPaneChange = key => {
        this.setState({
            activeKey: key,
        })
    };

    render() {
        return (
          <AntdTabs hideAdd type='editable-card' onEdit={this.onEdit} onChange={this.onTabPaneChange} activeKey={this.state.activeKey}>{this.props.panes}</AntdTabs>
        );
    }
}

export default Tabs;
