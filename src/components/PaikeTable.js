/*
* @Author: vance
* @Date:   2017-07-30 10:58:04
* @Last Modified by:   vance
* @Last Modified time: 2017-08-03 02:49:38
*/


import React from 'react';
import { Table, Input, Icon, Button, Popconfirm, Upload } from 'antd';
import ajax from '../ajax'
import './PaikeTable.css';
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

export default class PaikeTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: '文件名',
      dataIndex: 'filename',
      width: '30%'
    }, {
      title: '备注',
      dataIndex: 'discript'
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record, index) => {
        return (
        this.state.dataSource.length > 0 ?
          (
          <div>
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
    ajax.download('http://localhost:3010/api/download/' + _id)
  }
  componentDidMount() {
    ajax.get('http://localhost:3010/api/files').then(function(data) {
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
      ajax.post('http://localhost:3010/api/file/' + _id, {
        discript: value
      }).then(function(file) {
        dataSource[index][key] = file[key];this.setState({
          dataSource
        });
      }.bind(this))

    };
  }

  render() {
    const {dataSource} = this.state;
    const columns = this.columns;
    return (
      <div>
        <Table bordered
               dataSource={ dataSource }
               columns={ columns } />
      </div>
      );
  }
}

