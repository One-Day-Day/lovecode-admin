import React from 'react';
import Tabs from '../../components/tabs';
import {connect} from 'react-redux';
import {closeErrorInfoBar, showErrorInfoBar} from '../../actions/errors';

export const createTabContainer = (component, options) => {
    const getTabPaneKey = () => {
        return `tab-pane-${new Date().getTime()}`;
    };

    const convertToTabPane = (Component, props, options) => {
        const tabPaneKey = getTabPaneKey();

        return (
            <Tabs.TabPane {...options} tabPaneKey={tabPaneKey}>
                <Component {...props}/>
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
                    convertToTabPane(component, this.getComponentProps(key), {...options, key})
                ],
            };
        }

        getComponentProps(key) {
            return {
                addTabPane: this.addTabPane.bind(this),
                activeTabPane: this.activeTabPane.bind(this),
                showErrorInfoBar: message => {
                    this.props.showErrorInfoBar(key, message);
                    setTimeout(() => this.props.closeErrorInfoBar(key), 5000);
                },
            };
        }

        activeTabPane(key) {
            this.setState({
                ...this.state,
                activeKey: key,
            })
        };

        addTabPane(component, options) {
            const key = getTabPaneKey();
            this.setState({
                panes: [
                    ...this.state.panes,
                    convertToTabPane(component, this.getComponentProps(key), {...options, key}),
                ],
                activeKey: key,
            });
            return key;
        };

        onRemove(targetKey) {
            let {activeKey} = this.state;
            let lastIndex;
            this.state.panes.forEach((pane, i) => {
                if (pane.key === targetKey) {
                    lastIndex = i - 1;
                }
            });
            const panes = this.state.panes.filter(pane => pane.key !== targetKey);
            if (panes.length && activeKey === targetKey) {
                if (lastIndex >= 0) {
                    activeKey = panes[lastIndex].key;
                } else {
                    activeKey = panes[0].key;
                }
            } else if (panes.length === 0) {
                activeKey = this.getDefaultActiveKey();
            }
            this.setState({panes, activeKey});
        };

        getTabPaneList() {
            return [
                ...this.state.panes,
            ];
        };

        onChange(key) {
            this.setState({
                activeKey: key,
            })
        };

        render() {
            return (
                <Tabs onChange={this.onChange.bind(this)} onRemove={this.onRemove.bind(this)}
                      activeKey={this.state.activeKey} panes={this.getTabPaneList()}/>
            );
        }
    }

    const mapStateToProps = state => ({});
    const mapDispatchToProps = {
        showErrorInfoBar,
        closeErrorInfoBar,
    };
    return connect(mapStateToProps, mapDispatchToProps)(TabContainer);
};

