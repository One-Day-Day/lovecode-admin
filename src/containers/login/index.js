import React from 'react';
import { Button, Form, Icon, Input, Spin } from 'antd';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
import * as PropTypes from 'prop-types';
import { cleanErrorMessage, getToken, setToken } from '../../actions/login';
import styles from './index.module.scss';

class LoginContainer extends React.Component {
  componentDidMount() {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.props.setToken(token);
    }
  }

  handleSubmit = (e) => {
    this.props.cleanErrorMessage();
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.getToken(values.username, values.password);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const defaultPage = '/admin/problem-management/problems';
    const { pathname } = this.props.location.from || { pathname: defaultPage };
    if (this.props.hasToken) {
      return (<Redirect to={{ pathname }} />);
    }
    return (
      <div className={styles.bg}>
        <div className={styles.loginContainer}>
          <h1 className={styles.title}>用户登录</h1>
          <Form onSubmit={this.handleSubmit} className={styles.loginForm}>
            <Form.Item>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入你的用户名!' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用户名"
                  onFocus={this.props.cleanErrorMessage}
                  disabled={this.props.authorizing}
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入你的密码!' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码"
                  onFocus={this.props.cleanErrorMessage}
                  disabled={this.props.authorizing}
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Spin spinning={this.props.authorizing}>
                <Button type="primary" htmlType="submit" className={styles.loginFormButton}>
                                    登录
                </Button>
              </Spin>
            </Form.Item>
            {this.props.error && <span className={styles.errorMessage}>{this.props.error.message}</span>}
          </Form>
        </div>
      </div>
    );
  }
}

LoginContainer.propTypes = {
  error: PropTypes.object,
  authorizing: PropTypes.bool,
  form: PropTypes.object,
  getToken: PropTypes.func,
  setToken: PropTypes.func,
  hasToken: PropTypes.bool,
  cleanErrorMessage: PropTypes.func,
  location: PropTypes.object,
};

const mapStateToProps = (state) => ({
  error: state.auth.error,
  authorizing: state.auth.authorizing,
  hasToken: state.auth.token !== null,
});

const mapDispatchToProps = {
  getToken,
  setToken,
  cleanErrorMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'login' })(withRouter(LoginContainer)));
