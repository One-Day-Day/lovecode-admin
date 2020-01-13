import React from 'react';
import {Button, Checkbox, Form, Icon, Input} from 'antd';
import styles from './index.module.scss';

class LoginContainer extends React.Component {
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className={styles.bg}>
                <div className={styles.loginContainer}>
                    <h1 className={styles.title}>用户登录</h1>
                    <Form onSubmit={this.handleSubmit.bind(this)} className={styles.loginForm}>
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '请输入你的用户名!' }],
                            })(
                                <Input
                                    prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder='用户名'
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入你的密码!' }],
                            })(
                                <Input
                                    prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type='password'
                                    placeholder='密码'
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' htmlType='submit' className={styles.loginFormButton}>
                                登录
                            </Button>
                            {/* 或 <a href=''>立即注册！</a> */}
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Form.create({name: 'login'})(LoginContainer);
