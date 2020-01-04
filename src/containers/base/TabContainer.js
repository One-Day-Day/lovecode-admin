import React from 'react';
import Tabs from '../../components/tabs';

class TabContainer extends React.Component {
    state = {
        activeKey: null,
        panes: [],
    };

    componentDidMount() {
        this.activePane(this.getDefaultActiveKey())
    }

    getDefaultActiveKey() {
        return null;
    };

    activePane (key) {
        this.setState({
            activeKey: key,
        })
    };

    addPane(pane) {
        this.setState({
            panes: [
                ...this.state.panes,
                pane,
            ],
            activeKey: pane.key,
        })
    };

    onRemove(targetKey) {
        let { activeKey, } = this.state;
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
        this.setState({ panes, activeKey, });
    };

    getDefaultPane() {
        return [];
    };

    getTabPaneList() {
        return [
            ...this.getDefaultPane(),
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
            <Tabs onChange={this.onChange.bind(this)} onRemove={this.onRemove.bind(this)} activeKey={this.state.activeKey} panes={this.getTabPaneList()}/>
        );
    }
}

export default TabContainer;
