import React from 'react';
import * as PropTypes from 'prop-types';
import Tabs from '../../components/tabs';

class TabsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.manager.getState(),
    };
  }

  componentDidMount() {
    this.props.manager.onSateChange((sate) => this.setState(sate));
  }

  render() {
    return (
      <Tabs
        onChange={(key) => this.props.manager.activeTabPane(key)}
        onRemove={(key) => this.props.manager.removeTabPane(key)}
        activeKey={this.state.activeKey}
        panes={this.state.panes}
      />
    );
  }
}

TabsContainer.propTypes = {
  manager: PropTypes.object,
};

export default TabsContainer;
