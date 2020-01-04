import React from 'react';
import {Tabs as AntdTabs} from 'antd';
import styles from './index.module.scss';
import PropTypes from 'prop-types';

class Tabs extends React.Component {
    static TabPane = props => {
        return <AntdTabs.TabPane {...props}>
            <div className={styles.container}>{props.children}</div>
        </AntdTabs.TabPane>
    };

    onEdit(targetKey, action) {
        this[action](targetKey);
    };

    remove(targetKey) {
        this.props.onRemove(targetKey);
    };

    render() {
        return (
          <AntdTabs hideAdd type='editable-card' onEdit={this.onEdit} {...this.props}>{this.props.panes}</AntdTabs>
        );
    }
}

Tabs.propTypes = {
    onRemove: PropTypes.func,
    onChange: PropTypes.func,
    activeKey: PropTypes.string,
    panes: PropTypes.array,
};

export default Tabs;
