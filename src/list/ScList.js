/*
 * @Description: form和table联动组件
 * @Author: 鲁大师
 * @Date: 2019-12-16 20:47:44
 * @LastEditors: 鲁大师
 * @LastEditTime: 2020-03-27 16:03:35
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ScForm, ScTable } from '../index'
import _ from 'lodash'

class ScList extends Component {
  constructor(props) {
    super(props)
    this.formInstance = null,
    this.tableInstance = null,

    this.state = {
      formConfig: {
        ...props.formConfig,
        items: this.setFormConfig(props.formConfig)
      },
      tableConfig: props.tableConfig,
    }

    this.$ScList = null
  }

  componentDidMount() {
    this.didMount()
  }

  didMount() {
    const { onMount } = this.props
    if(onMount && typeof onMount === 'function') {
      this.$ScList = {
        ...this.formInstance,
        ...this.tableInstance
      }
      onMount(this.$ScList)
    }
    this.listFetch()
  }

  listFetch() {
    this.formInstance.validateFields((error, values) => {
      if(error) {
        return
      }
      this.tableInstance.setParams(values)
    })
  }

  setFormConfig(formConfig) {
    const { items=[] } = formConfig
    return _.map(items, (item) => {
      const { component = '', settings = {}, props = {} } = item
      if(component === 'Button') {
        const { htmlType = '' } = settings
        if(htmlType === 'submit') {
          props.onClick = this.listFetch.bind(this)
        } else if(htmlType === 'reset'){
          props.onClick = () => {
            this.formInstance.resetFields()
            this.listFetch()
          }
        }
        return {
          ...item,
          props,
        }
      }
      return item
    })
  }

  render() {
    const { formConfig, tableConfig } = this.state
    console.log(tableConfig)
    return (
      <React.Fragment>
        <ScForm {...formConfig} onMount={formInstance => this.formInstance = formInstance}></ScForm>
        <ScTable {...tableConfig} onMount={tableInstance => this.tableInstance = tableInstance}></ScTable>
      </React.Fragment>
    )
  }
}

ScList.propTypes = {
  formConfig: PropTypes.object,
  // operationConfig: PropTypes.object,
  tableConfig: PropTypes.object,
  onMount: PropTypes.func
}
ScList.defaultProps = {
  formConfig: {},
  // operationConfig: PropTypes.object,
  tableConfig: {},
}

export default ScList