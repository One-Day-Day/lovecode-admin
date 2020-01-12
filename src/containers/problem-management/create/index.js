import React from 'react';
import {Button, Col, Form, Icon, Input, InputNumber, Row, Select, Upload} from 'antd';
import {createProblem} from '../../../api/problems';

class CreateProblemContainer extends React.Component {
    state = {
        name: '',
        timeLimit: 1000,
        memoryLimit: 1024,
        categories: [],
        testcase: [],
        description: '',
        inputDescription: '',
        outputDescription: '',
        hint: '',
        sampleInput: '',
        sampleOutput: '',
    };

    handleSubmit(event) {
        event.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            createProblem(values)
                .catch(error => {
                    this.props.showErrorInfoBar('保存失败');
                })
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const {
            name,
            timeLimit,
            memoryLimit,
            description,
            hint,
            outputDescription,
            inputDescription,
            categories,
            sampleInput,
            sampleOutput,
            testcase,
        } = this.state;

        return (
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <Form.Item label='题目名称'>
                        {getFieldDecorator('name', {
                            initialValue: name,
                            rules: [
                                {required: true, message: '请填写题目名称'},
                            ],
                        })(<Input placeholder='请输入题目名称' />)}
                    </Form.Item>
                    <Row>
                        <Col span={8}>
                            <Form.Item label='时间限制(毫秒)'>
                                {getFieldDecorator('timeLimit', {
                                    initialValue: timeLimit,
                                    rules: [
                                        {required: true, message: '请填写时间限制'},
                                    ],
                                })(<InputNumber min={1} max={300000}/>)}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label='内存限制(KB)'>
                                {getFieldDecorator('memoryLimit', {
                                    initialValue: memoryLimit,
                                    rules: [
                                        {required: true, message: '请填写内存限制'},
                                    ],
                                })(<InputNumber min={1} max={1048576}/>)}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label='测试用例'>
                        {getFieldDecorator('testcase', {
                            initialValue: testcase,
                            rules: [
                                {required: true, message: '请上传测试用例'},
                            ],
                        })(
                            <Upload>
                                <Button>
                                    <Icon type='upload' /> 上传
                                </Button>
                            </Upload>
                        )}
                    </Form.Item>
                    <Form.Item label='题目分类'>
                        {getFieldDecorator('categories', {
                            initialValue: categories,
                        })(
                            <Select
                                mode='multiple'
                                style={{width: '100%'}}
                                placeholder='选择题目分类'
                            >
                                <Select.Option key={1}>A</Select.Option>
                                <Select.Option key={2}>B</Select.Option>
                                <Select.Option key={3}>C</Select.Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label='题目描述'>
                        {getFieldDecorator('description', {
                            initialValue: description,
                        })(<Input.TextArea rows={10}/>)}
                    </Form.Item>
                    <Form.Item label='输入描述'>
                        {getFieldDecorator('inputDescription', {
                            initialValue: inputDescription,
                        })(<Input.TextArea rows={10}/>)}
                    </Form.Item>
                    <Form.Item label='输出描述'>
                        {getFieldDecorator('outputDescription', {
                            initialValue: outputDescription,
                        })(<Input.TextArea rows={10}/>)}
                    </Form.Item>
                    <Form.Item label='提示'>
                        {getFieldDecorator('hint', {
                            initialValue: hint,
                        })(<Input.TextArea rows={10}/>)}
                    </Form.Item>
                    <Form.Item label='样例输入'>
                        {getFieldDecorator('sampleInput', {
                            initialValue: sampleInput,
                        })(<Input.TextArea rows={10}/>)}
                    </Form.Item>
                    <Form.Item label='样例输出'>
                        {getFieldDecorator('sampleOutput', {
                            initialValue: sampleOutput,
                        })(<Input.TextArea rows={10}/>)}
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit'>
                            保存
                        </Button>
                    </Form.Item>
                </Form>
        );
    }
}


export default Form.create({ name: 'create' })(CreateProblemContainer);
