import Tabs from '../../components/tabs';

const getKey = () => `tab-pane-${new Date().getTime()}`;

export default class TabsManager {
  constructor(initSate = {}) {
    this.state = {
      panes: [],
      activeKey: null,
      ...initSate,
    };
    this.listeners = [];
  }

  addTabPane({ component, options }) {
    const key = getKey();
    this.state.activeKey = key;
    this.state.panes.push(Tabs.createTabPane({ ...options, key })(component, { manager: this }));
    this.fire();
  }

  activeTabPane(key) {
    this.state.activeKey = key;
    this.fire();
  }

  removeTabPane(targetKey) {
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
      activeKey = null;
    }
    this.state = {
      ...this.state,
      panes,
      activeKey,
    };
    this.fire();
  }

  onSateChange(listener) {
    this.listeners.push(listener);
  }

  fire() {
    this.listeners.forEach((listener) => {
      if (listener && typeof listener === 'function') {
        listener(this.state);
      }
    });
  }

  getState() {
    return this.state;
  }
}
