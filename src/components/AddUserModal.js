/*
* @Author: vance
* @Date:   2017-08-02 02:00:57
* @Last Modified by:   vance
* @Last Modified time: 2017-08-02 15:32:43
*/

import { Modal, Button } from 'antd';
import React from 'react'
import AddUserForm from './AddUserForm'
export default class AddUserModal extends React.Component {
  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible
    });
  }

  state = {
    visible: this.props.visible
  }
  showModal = () => {
    this.props.onChange(true)
  }
  handleOk = (e) => {
    this.handleSubmit(e);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.refs.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.onSubmit(values);
        this.close();
      }
    });
  }



  close = () => {
    this.props.onChange(false)
  }
  handleCancel = (e) => {
    console.log(e);
    this.close();
  }
  render() {
    return (
      <div>
        <Modal title="新建用户"
               visible={ this.state.visible }
               onOk={ this.handleOk }
               onCancel={ this.handleCancel }>
          <AddUserForm ref="form" onSubmit={ this.handleSubmit } />
        </Modal>
      </div>
      );
  }
}

