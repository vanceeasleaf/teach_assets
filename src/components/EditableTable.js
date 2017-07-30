/*
* @Author: vance
* @Date:   2017-07-30 10:58:04
* @Last Modified by:   vance
* @Last Modified time: 2017-07-30 11:20:34
*/


import React from 'react';
import { Table, Input, Icon, Button, Popconfirm, Upload } from 'antd';
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
      dataIndex: 'name',
      width: '30%',
      render: (text, record, index) => (
        <EditableCell value={ text } onChange={ this.onCellChange(index, 'name') } />
      ),
    }, {
      title: '备注',
      dataIndex: 'discript',
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record, index) => {
        return (
        this.state.dataSource.length > 1 ?
          (
          <div>
            <Popconfirm title="Sure to delete?" onConfirm={ () => this.onDelete(index) }>
              <a href="#">删除</a>
            </Popconfirm>
            <a href="#" style={ { marginLeft: 10 } }>下载</a>
          </div>
          ) : null
        );
      },
    }];

    this.state = {
      dataSource: [{
        key: '0',
        name: 'Edward King 0',
        age: '32',
        address: 'London, Park Lane no. 0',
      }, {
        key: '1',
        name: 'Edward King 1',
        age: '32',
        address: 'London, Park Lane no. 1',
      }],
      count: 2,
    };
  }
  onCellChange = (index, key) => {
    return (value) => {
      const dataSource = [...this.state.dataSource];
      dataSource[index][key] = value;
      this.setState({
        dataSource
      });
    };
  }
  onDelete = (index) => {
    const dataSource = [...this.state.dataSource];
    dataSource.splice(index, 1);
    this.setState({
      dataSource
    });
  }
  handleAdd = () => {
    const {count, dataSource} = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: 32,
      address: `London, Park Lane no. ${count}`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  }
  render() {
    const {dataSource} = this.state;
    const columns = this.columns;
    return (
      <div>
        <Upload>
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
