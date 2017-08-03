/*
* @Author: vance
* @Date:   2017-07-30 10:58:04
* @Last Modified by:   vance
* @Last Modified time: 2017-08-03 10:04:36
*/


import React from 'react';
import { Table, Input, Icon, Button, Popconfirm } from 'antd';
import './UsersList.css';
import AddUserModal from './AddUserModal';
import ajax from '../ajax';
class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: false,
    modalShow: false
  }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({
      value
    });
  }
  check = () => {
    this.setState({
      editable: false
    });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  edit = () => {
    this.setState({
      editable: true
    });
  }
  render() {
    const {value, editable} = this.state;
    return (
      <div className="editable-cell">
        { editable ?
          <div className="editable-cell-input-wrapper">
            <Input value={ value }
                   onChange={ this.handleChange }
                   onPressEnter={ this.check } />
            <Icon type="check"
                  className="editable-cell-icon-check"
                  onClick={ this.check } />
          </div>
          :
          <div className="editable-cell-text-wrapper">
            { value || ' ' }
            <Icon type="edit"
                  className="editable-cell-icon"
                  onClick={ this.edit } />
          </div> }
      </div>
      );
  }
}

export default class UsersList extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: '用户名',
      dataIndex: 'username',
      width: '20%',
      render: (text, record, index) => (
        <EditableCell value={ text } onChange={ this.onCellChange(index, 'username') } />
      ),
    }, {
      title: '密码',
      dataIndex: 'password',
      width: '20%',
      render: (text, record, index) => (
        <EditableCell value={ text } onChange={ this.onCellChange(index, 'password') } />
      ),
    }, {
      title: '真实姓名',
      dataIndex: 'realname',
      width: '20%',
      render: (text, record, index) => (
        <EditableCell value={ text } onChange={ this.onCellChange(index, 'realname') } />
      ),
    }, {
      title: '科目',
      dataIndex: 'course',
      width: '20%',
      render: (text, record, index) => (
        <EditableCell value={ text } onChange={ this.onCellChange(index, 'course') } />
      ),
    }, {
      title: '操作',
      dataIndex: 'operation',
      width: '20%',
      render: (text, record, index) => {
        return (
        this.state.dataSource.length > 1 ?
          (
          <div>
            <Popconfirm title="Sure to delete?" onConfirm={ () => this.onDelete(index) }>
              <a>删除</a>
            </Popconfirm>
          </div>
          ) : null
        );
      },
    }];

    this.state = {
      dataSource: []
    };
  }
  componentWillMount() {
    ajax.get('/api/users').then(function(data) {
      this.setState({
        dataSource: data
      })
    }.bind(this))
  }
  onCellChange = (index, key) => {
    return (value) => {
      const dataSource = [...this.state.dataSource];

      var _id = dataSource[index]._id;
      if (!_id) {
        alert("id error");
      }
      var user = {};
      user[key] = value;
      ajax.post('/api/user/' + _id, user).then(function(data) {
        dataSource[index] = data.user;
        this.setState({
          dataSource
        })
      }.bind(this))
    }
  }
  onDelete = (index) => {
    const dataSource = [...this.state.dataSource];
    var _id = dataSource[index]._id;
    if (!_id) {
      alert("id error");
    }
    ajax.post('/api/del_user/' + _id).then(function(data) {
      dataSource.splice(index, 1);
      this.setState({
        dataSource
      });
    }.bind(this))

  }
  handleAdd = () => {
    this.setState({
      //dataSource: [...dataSource, newData],
      //count: count + 1,
      modalShow: true
    });
  }
  commitNewData = (newData) => {

    const {dataSource} = this.state;
    ajax.post('/api/add_user', newData).then(function(data) {
      this.setState({
        dataSource: [...dataSource, data.user]
      })
    }.bind(this))
  }
  visibleChange = (visible) => {
    this.setState({
      modalShow: visible
    })
  }
  render() {
    const {dataSource} = this.state;
    const columns = this.columns;
    return (
      <div>
        <Button className="editable-add-btn" onClick={ this.handleAdd }>
          新增
        </Button>
        <Table bordered
               dataSource={ dataSource }
               columns={ columns } />
        <AddUserModal visible={ this.state.modalShow }
                      onChange={ this.visibleChange }
                      onSubmit={ this.commitNewData }></AddUserModal>
      </div>
      );
  }
}

