import React from 'react';
import * as PropTypes from 'prop-types';
import { Menu } from 'antd';
import { matchPath, withRouter } from 'react-router';
import routes from '../../config/route';

class LeftMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: [],
    };
  }

  componentDidMount() {
    const defaultKeys = routes
      .filter(({ path, exact, strict }) => matchPath(this.props.location.pathname, { path, exact, strict }))
      .map(({ key }) => key);
    this.setState({
      selectedKeys: [
        ...this.state.selectedKeys,
        ...defaultKeys,
      ],
    });
  }

  render() {
    return (
      <Menu theme="dark" defaultSelectedKeys={['user-management']} selectedKeys={this.state.selectedKeys}>
        {routes.map(({ key, title }) => <Menu.Item key={key}><span>{title}</span></Menu.Item>)}
      </Menu>
    );
  }
}

LeftMenu.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(LeftMenu);
