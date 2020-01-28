import React from 'react';
import { Tabs as AntdTabs } from 'antd';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import styles from './index.module.scss';

class Tabs extends React.Component {
    static TabPane = connect((state) => ({ errors: state.errors }), {})((props) => {
      const { tabPaneKey } = props;
      const hasError = props.errors[tabPaneKey] !== undefined;
      return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <AntdTabs.TabPane {...props}>
          { hasError && <div className={styles.errorInfoBar}>{props.errors[tabPaneKey]}</div> }
          <div className={`${styles.container} ${hasError ? styles.withErrorInfoBar : ''}`}>{props.children}</div>
        </AntdTabs.TabPane>
      );
    });

    onEdit = (targetKey, action) => {
      this[action](targetKey);
    };

    remove(targetKey) {
      this.props.onRemove(targetKey);
    }

    render() {
      return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <AntdTabs hideAdd type="editable-card" onEdit={this.onEdit} {...this.props}>{this.props.panes}</AntdTabs>
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
