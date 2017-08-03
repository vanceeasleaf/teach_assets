/*
* @Author: vance
* @Date:   2017-07-30 10:58:04
* @Last Modified by:   vance
* @Last Modified time: 2017-08-03 18:03:05
*/


import React from 'react';
import { Table, Input, Icon, Button, Popconfirm, Upload } from 'antd';
import ajax from '../ajax'
import './EditableTable.css';
class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: false,
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

export default class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: '文件名',
      dataIndex: 'filename',
      width: '30%'
    }, {
      title: '备注',
      dataIndex: 'discript',
      render: (text, record, index) => (
        <EditableCell value={ text } onChange={ this.onCellChange(index, 'discript') } />
      ),
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record, index) => {
        return (
        this.state.dataSource.length > 0 ?
          (
          <div>
            <Popconfirm title="Sure to delete?" onConfirm={ () => this.onDelete(index) }>
              <a>删除</a>
            </Popconfirm>
            <a style={ { marginLeft: 10 } } onClick={ () => this.download(index) }>下载</a>
          </div>
          ) : null
        );
      },
    }];

    this.state = {
      dataSource: []
    };
  }
  download = (index) => {
    const dataSource = [...this.state.dataSource];
    var _id = dataSource[index]._id;
    if (!_id) {
      alert('error _id');return;
    }
    var filename = dataSource[index].filename;
    ajax.download('/api/download/' + _id, filename)
    return '/api/download/' + _id
  }
  componentDidMount() {
    ajax.get('/api/files').then(function(data) {
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
        alert('error _id');return;
      }
      ajax.post('/api/file/' + _id, {
        discript: value
      }).then(function(file) {
        dataSource[index][key] = file[key];this.setState({
          dataSource
        });
      }.bind(this))

    };
  }
  onDelete = (index) => {
    const dataSource = [...this.state.dataSource];
    var _id = dataSource[index]._id;
    if (!_id) {
      alert('error _id');return;
    }
    ajax.post('/api/del_file/' + _id).then(function() {
      dataSource.splice(index, 1);
      this.setState({
        dataSource
      });
    }.bind(this))

  }
  handleUpload = (info) => {
    console.log(info);
    if (info.file.status != 'done') return;
    console.log(info.file)
    this.setState({
      dataSource: [...this.state.dataSource, info.file.response]
    });
  }
  render() {
    const {dataSource} = this.state;
    const columns = this.columns;
    const props = {
      action: '/api/upload',
      showUploadList: false,
      headers: {
        'Access-Token': localStorage.getItem('access_token') || ''
      },
      onChange: this.handleUpload
    };
    return (
      <div>
        <Upload {...props}>
          <Button className="editable-add-btn">
            上传文件
          </Button>
        </Upload>
        <Table bordered
               dataSource={ dataSource }
               columns={ columns } />
      </div>
      );
  }
}

