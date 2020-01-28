import React from 'react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';
import Tabs from '../../components/tabs';
import { closeErrorInfoBar, showErrorInfoBar } from '../../actions/errors';

// eslint-disable-next-line max-lines-per-function
export function createTabContainer(component, options) {
  const getTabPaneKey = () => `tab-pane-${new Date().getTime()}`;

  const convertToTabPane = (Component, props, options) => {
    const tabPaneKey = getTabPaneKey();

    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <Tabs.TabPane {...options} key={tabPaneKey}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...props} />
      </Tabs.TabPane>
    );
  };

  class TabContainer extends React.Component {
    constructor(props) {
      super(props);
      const key = getTabPaneKey();
      this.state = {
        activeKey: key,
        panes: [
          convertToTabPane(component, this.getComponentProps(key), { ...options, key }),
        ],
      };
    }

    getComponentProps(key) {
      return {
        addTabPane: this.addTabPane.bind(this),
        activeTabPane: this.activeTabPane.bind(this),
        showErrorInfoBar: (message) => {
          this.props.showErrorInfoBar(key, message);
          setTimeout(() => this.props.closeErrorInfoBar(key), 5000);
        },
      };
    }

    activeTabPane(key) {
      this.setState({
        ...this.state,
        activeKey: key,
      });
    }

    addTabPane(component, options) {
      const key = getTabPaneKey();
      this.setState({
        panes: [
          ...this.state.panes,
          convertToTabPane(component, this.getComponentProps(key), { ...options, key }),
        ],
        activeKey: key,
      });
      return key;
    }

    onRemove = (targetKey) => {
      let { activeKey } = this.state;
      let lastIndex;
      this.state.panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1;
        }
      });
      const panes = this.state.panes.filter((pane) => pane.key !== targetKey);
      if (panes.length && activeKey === targetKey) {
        if (lastIndex >= 0) {
          activeKey = panes[lastIndex].key;
        } else {
          activeKey = panes[0].key;
        }
      } else if (panes.length === 0) {
        activeKey = this.getDefaultActiveKey();
      }
      this.setState({ panes, activeKey });
    };

    getTabPaneList() {
      return [
        ...this.state.panes,
      ];
    }

    onChange = (key) => {
      this.setState({
        activeKey: key,
      });
    };

    render() {
      return (
        <Tabs
          onChange={this.onChange}
          onRemove={this.onRemove}
          activeKey={this.state.activeKey}
          panes={this.getTabPaneList()}
        />
      );
    }
  }

  TabContainer.propTypes = {
    showErrorInfoBar: PropTypes.func.isRequired,
    closeErrorInfoBar: PropTypes.func.isRequired,
  };

  const mapStateToProps = () => ({});
  const mapDispatchToProps = {
    showErrorInfoBar,
    closeErrorInfoBar,
  };
  return connect(mapStateToProps, mapDispatchToProps)(TabContainer);
}
