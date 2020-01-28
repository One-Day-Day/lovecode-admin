import React from 'react';
import {Tabs as AntdTabs} from 'antd';
import styles from './index.module.scss';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class Tabs extends React.Component {
    static TabPane = connect(state => ({errors: state.errors}), {})(props => {
        const { tabPaneKey } = props;
        const hasError = props.errors[tabPaneKey] !== undefined;
        return <AntdTabs.TabPane {...props}>
            { hasError && <div className={styles.errorInfoBar}>{props.errors[tabPaneKey]}</div> }
            <div className={`${styles.container} ${hasError ? styles.withErrorInfoBar : ''}`}>{props.children}</div>
        </AntdTabs.TabPane>
    });

    onEdit(targetKey, action) {
        this[action](targetKey);
    };

    remove(targetKey) {
        this.props.onRemove(targetKey);
    };

    render() {
        return (
          <AntdTabs hideAdd type='editable-card' onEdit={this.onEdit.bind(this)} {...this.props}>{this.props.panes}</AntdTabs>
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

