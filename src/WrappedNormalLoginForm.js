/*
* @Author: vance
* @Date:   2017-07-24 11:23:39
* @Last Modified by:   vance
* @Last Modified time: 2017-08-02 01:39:46
*/


import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Link } from 'react-router-dom';
import ajax from './ajax';
import "./Login.css";
Component.contextTypes = {
  router: React.PropTypes.object.isRequired
}
const FormItem = Form.Item;
class NormalLoginForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);



        ajax.post('http://localhost:3010/api/auth', values)
          .then(function(data) {
            console.log(data);

            this.context.router.history.push("/admin_home")
          }.bind(this))
      //  .then(json => dispatch(receivePosts(json)))
      // .catch(error => dispatch(requestExceptions(error)));
      }
    });

  }
  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Form id="components-form-demo-normal-login"
            onSubmit={ this.handleSubmit }
            className="login-form">
        <FormItem>
          { getFieldDecorator('username', {
              rules: [{
                required: true,
                message: 'Please input your username!'
              }],
            })(
              <Input prefix={ <Icon type="user" style={ { fontSize: 13 } } /> } placeholder="Username" />
            ) }
        </FormItem>
        <FormItem>
          { getFieldDecorator('password', {
              rules: [{
                required: true,
                message: 'Please input your Password!'
              }],
            })(
              <Input prefix={ <Icon type="lock" style={ { fontSize: 13 } } /> }
                     type="password"
                     placeholder="Password" />
            ) }
        </FormItem>
        <FormItem>
          { getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>
                Remember me
              </Checkbox>
            ) }
          <a className="login-form-forgot" href="">Forgot password</a>
          <Button type="primary"
                  htmlType="submit"
                  className="login-form-button">
            Log in
          </Button>
        </FormItem>
      </Form>
      );
  }
}
const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default WrappedNormalLoginForm;
