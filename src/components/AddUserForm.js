/*
* @Author: vance
* @Date:   2017-08-02 12:29:28
* @Last Modified by:   vance
* @Last Modified time: 2017-08-02 13:52:41
*/

import { Form, Select, Input, Button } from 'antd';
import React from 'react'
const FormItem = Form.Item;
const Option = Select.Option;

class App extends React.Component {
  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Form onSubmit={ this.props.handleSubmit }>
        <FormItem label="用户名"
                  labelCol={ { span: 4 } }
                  wrapperCol={ { span: 8 } }>
          { getFieldDecorator('username', {
              rules: [{
                required: true,
                message: 'Please input username!'
              }],
            })(
              <Input />
            ) }
        </FormItem>
        <FormItem label="密码"
                  labelCol={ { span: 4 } }
                  wrapperCol={ { span: 8 } }>
          { getFieldDecorator('password', {
              rules: [{
                required: true,
                message: 'Please input password!'
              }],
            })(
              <Input />
            ) }
        </FormItem>
        <FormItem label="真实姓名"
                  labelCol={ { span: 4 } }
                  wrapperCol={ { span: 8 } }>
          { getFieldDecorator('realname', {
              rules: [{
                required: true,
                message: 'Please input realname!'
              }],
            })(
              <Input />
            ) }
        </FormItem>
        <FormItem label="科目"
                  labelCol={ { span: 4 } }
                  wrapperCol={ { span: 8 } }>
          { getFieldDecorator('course', {
              rules: [{
                required: true,
                message: 'Please input course!'
              }],
            })(
              <Input />
            ) }
        </FormItem>
      </Form>
      );
  }
}

const AddUserForm = Form.create()(App);
export default AddUserForm;
