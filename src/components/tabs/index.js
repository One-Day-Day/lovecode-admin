import React from "react";
import {Tabs as AntdTabs} from "antd";
import styles from './index.module.scss';

class Tabs extends React.Component {
    static TabPane = props => {
        return <AntdTabs.TabPane {...props}>
            <div className={styles.container}>{props.children}</div>
        </AntdTabs.TabPane>
    };

    render() {
        return (
          <AntdTabs hideAdd type='editable-card'>{this.props.children}</AntdTabs>
        );
    }
}

export default Tabs;
