import React from 'react';
import { Tabs as AntdTabs } from 'antd';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import styles from './index.module.scss';
import { closeErrorInfoBar, showErrorInfoBar } from '../../actions/tabs';

class Tabs extends React.Component {
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

Tabs.createTabPane = ({ key, tab, closable }) => {
  const ConnectedTabPane = connect((state) => ({ errors: state.tabs.errors }), {})((props) => {
    const hasError = typeof props.errors[key] === 'string';
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <AntdTabs.TabPane {...props}>
        { hasError && <div className={styles.errorInfoBar}>{props.errors[key]}</div> }
        <div className={`${styles.container} ${hasError ? styles.withErrorInfoBar : ''}`}>{props.children}</div>
      </AntdTabs.TabPane>
    );
  });
  // eslint-disable-next-line react/display-name
  return (component, props) => {
    let timer = null;
    const cancelTimer = () => {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
      }
    };

    const mapDispatchToProps = {
      showErrorInfoBar: (msg, { autoClose = false, timeout = 3000 }) => (dispatch) => {
        cancelTimer();
        if (autoClose) {
          timer = setTimeout(() => dispatch(closeErrorInfoBar(key)), timeout);
        }
        dispatch(showErrorInfoBar(key, msg));
      },
      closeErrorInfoBar: () => {
        cancelTimer();
        return closeErrorInfoBar(key);
      },
    };

    const ConnectedComponent = connect(() => ({}), mapDispatchToProps)(component);
    return (
      <ConnectedTabPane key={key} tab={tab} closable={closable}>
        {React.createElement(ConnectedComponent, {
          ...props,
          tabPaneKey: key,
        })}
      </ConnectedTabPane>
    );
  };
};


Tabs.propTypes = {
  onRemove: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  activeKey: PropTypes.string,
  panes: PropTypes.array,
};

export default Tabs;
