import React from 'react';
import { Button, Col, Form, Icon, Input, InputNumber, Row, Select, Upload } from 'antd';
import * as PropTypes from 'prop-types';
import { createProblem } from '../../../api/problems';

class CreateProblemContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      createProblem(values)
        .catch(() => {
          this.props.showErrorInfoBar('保存失败', { autoClose: true });
        });
    });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        {this.renderTitle()}
        {this.renderLimit()}
        {this.renderUploadTestCase()}
        {this.renderCategorySelect()}
        {this.renderDescription()}
        {this.renderHint()}
        {this.renderSample()}
        <Form.Item>
          <Button type="primary" htmlType="submit">保存</Button>
        </Form.Item>
      </Form>
    );
  }

  renderSample() {
    const { getFieldDecorator } = this.props.form;
    return (
      <>
        <Form.Item label="样例输入">
          {getFieldDecorator('sampleInput', {
            initialValue: this.state.sampleInput,
          })(<Input.TextArea rows={10} />)}
        </Form.Item>
        <Form.Item label="样例输出">
          {getFieldDecorator('sampleOutput', {
            initialValue: this.state.sampleOutput,
          })(<Input.TextArea rows={10} />)}
        </Form.Item>
      </>
    );
  }

  renderHint() {
    return (
      <Form.Item label="提示">
        {this.props.form.getFieldDecorator('hint', {
          initialValue: this.state.hint,
        })(<Input.TextArea rows={10} />)}
      </Form.Item>
    );
  }

  renderDescription() {
    const { getFieldDecorator } = this.props.form;
    return (
      <>
        <Form.Item label="题目描述">
          {getFieldDecorator('description', {
            initialValue: this.state.description,
          })(<Input.TextArea rows={10} />)}
        </Form.Item>
        <Form.Item label="输入描述">
          {getFieldDecorator('inputDescription', {
            initialValue: this.state.inputDescription,
          })(<Input.TextArea rows={10} />)}
        </Form.Item>
        <Form.Item label="输出描述">
          {getFieldDecorator('outputDescription', {
            initialValue: this.state.outputDescription,
          })(<Input.TextArea rows={10} />)}
        </Form.Item>
      </>
    );
  }

  renderCategorySelect() {
    return (
      <Form.Item label="题目分类">
        {this.props.form.getFieldDecorator('categories', {
          initialValue: this.state.categories,
        })(
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="选择题目分类"
          >
            <Select.Option key={1}>A</Select.Option>
            <Select.Option key={2}>B</Select.Option>
            <Select.Option key={3}>C</Select.Option>
          </Select>,
        )}
      </Form.Item>
    );
  }

  renderUploadTestCase() {
    return (
      <Form.Item label="测试用例">
        {this.props.form.getFieldDecorator('testcase', {
          initialValue: this.state.testcase,
          rules: [
            { required: true, message: '请上传测试用例' },
          ],
        })(
          <Upload>
            <Button>
              <Icon type="upload" /> 上传
            </Button>
          </Upload>,
        )}
      </Form.Item>
    );
  }

  renderLimit() {
    return (
      <Row>
        <Col span={8}>
          <Form.Item label="时间限制(毫秒)">
            {this.props.form.getFieldDecorator('timeLimit', {
              initialValue: this.state.timeLimit,
              rules: [
                { required: true, message: '请填写时间限制' },
              ],
            })(<InputNumber min={1} max={300000} />)}
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="内存限制(KB)">
            {this.props.form.getFieldDecorator('memoryLimit', {
              initialValue: this.state.memoryLimit,
              rules: [
                { required: true, message: '请填写内存限制' },
              ],
            })(<InputNumber min={1} max={1048576} />)}
          </Form.Item>
        </Col>
      </Row>
    );
  }

  renderTitle() {
    return (
      <Form.Item label="题目名称">
        {this.props.form.getFieldDecorator('name', {
          initialValue: this.state.name,
          rules: [
            { required: true, message: '请填写题目名称' },
          ],
        })(<Input placeholder="请输入题目名称" />)}
      </Form.Item>
    );
  }
}

CreateProblemContainer.propTypes = {
  form: PropTypes.shape({
    getFieldDecorator: PropTypes.func.isRequired,
    validateFieldsAndScroll: PropTypes.func.isRequired,
  }),
  showErrorInfoBar: PropTypes.func,
  closeErrorInfoBar: PropTypes.func,
};

export default Form.create({ name: 'create' })(CreateProblemContainer);
