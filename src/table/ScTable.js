/*
 * @Description: 
 * @Author: 鲁大师
 * @Date: 2019-09-16 09:39:23
 * @LastEditors: 鲁大师
 * @LastEditTime: 2020-03-27 14:52:19
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, message } from 'antd'
import { fetchService, fetchBefore } from './fetch'
import { ScSpin } from '../index'
import _ from 'lodash'
// pagination的默认props
import { paginationDefaultProps } from './pagination'
const FN = function () {}

class ScTable extends Component {
  constructor (props) {
    super(props)
    this.instanceApis = {
      getDataSource: this.getDataSource.bind(this),
      setDataSource: this.setDataSource.bind(this),
      setCurrentPage: this.setCurrentPage.bind(this),
      getPageData: this.getPageData.bind(this),
      setPageData: this.setPageData.bind(this),
      fetch: this.fetch.bind(this),
      query: this.query.bind(this),
      refreshTable: this.refreshTable.bind(this),
      resetPage: this.resetPage.bind(this),
      getParams: this.getParams.bind(this),
      setParams: this.setParams.bind(this),
    }
    const tableConfig = this.setTableConfig(props)
    this.state = {
      ...tableConfig,
      fetchParams: {},
      spinning: false
    }
  }

  componentDidMount() {
    this.didMount()
  }

  setTableConfig() {
    const { onMount } = this.props
    let newProps = null
    if(onMount && typeof onMount === 'function') {
      newProps = onMount(this.instanceApis, this)
      if(!newProps) {
        newProps = Object.assign({}, this.props)
      }
    }
    let { settings={}, props={} } = newProps

    return {
      settings,
      props
    }
  }

  didMount() {
    this.setPaginationProps(this.state)
    const { settings={} } = this.state
    const { autoFetch=false } = settings
    if(autoFetch) {
      this.fetch()
    }
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps) {
    if(_.isEqual(this.props, nextProps) === false) {
      this.setState({
        ...nextProps
      })
      this.setPaginationProps(nextProps)
      const { autoFetch=false } = nextProps.settings
      if(autoFetch) {
        this.fetch()
      }
      return true
    }
  }

  // set所有table的props数据
  setTableProps(key, value) {
    this.setState(prev => ({
      props: {
        ... prev.props,
        [key]: _.isPlainObject(value) ? {
          ...prev.props[key],
          ...value
        } : value
      }
    }))
  }

  getTableProps(key) {
    return this.state.props[key]
  }
  // ScTable的API方法
  setDataSource(dataSource=[]) {
    this.setTableProps('dataSource', dataSource)
  }
  // 获取dataSource，返回[]
  getDataSource() {
    return this.getTableProps('dataSource')
  }
  // 设置当前页面，并发送请求，参数为Number
  setCurrentPage(current=1){
    this.setFetchParams({page: current})
  }
  // 设置pagination，接收参数Object，并发送请求
  setPageData(pagination={}){
    this.setTableProps('pagination', pagination)
  }
  // 获取pagination数据， 返回Object
  getPageData(){
    return this.getTableProps('pagination')
  }
  // 发送请求，接收传递参数Object
  fetch(params={}){
    this.setFetchParams(params)
  }
  // 发送请求，接收传递数组
  query(args){
    if(args[0] !== null) {
      message.error('请求参数有误')
      return 
    }
    this.setFetchParams(args[1])
  }
  // 发送当前请求参数，并刷新当前table
  refreshTable(){
    // 发送当前请求数据
    this.setFetchParams()
  }
  // 重置请求参数，并发送数据
  resetPage(){
    this.setState({
      fetchParams: {}
    }, () => {
      this.setFetchParams()
    })
  }
  // 设置请求参数，请求参数为Object，并发送请求
  setParams(fetchParams){
    this.setState({
      fetchParams,
    }, () => {
      this.fetchHandle(this.state.settings, fetchParams)
    })
  }
  // 获取请求参数，返回查询对象Object
  getParams(){
    return this.state.fetchParams
  }

  // pagination的配置更改
  setPaginationProps(ScTableProps) {
    const {
      props={},
    } = ScTableProps
    const {
      pagination = {}
    } = props

    const onChange = (page, pageSize) => {
      this.setFetchParams({page, pageSize})
    }
    const onShowSizeChange = (page, pageSize) => {
      this.setFetchParams({ page: 1, pageSize})
    }
    if(pagination !== false) {
      const paginationProps = _.assign(
        {},
        paginationDefaultProps(onChange, onShowSizeChange),
        pagination
      )
      this.setTableProps('pagination', paginationProps)
    } else {
      this.setTableProps('pagination', false)
    }
  }

  // 绑定table的fetch请求方法
  setFetch(fetch) {
    this.setState(prev => ({
      settings: {
        ...prev.settings,
        fetch
      }
    }))
  }

  // 设置请求参数给state，并发送请求
  async setFetchParams(params={}) {
    const { settings={}, fetchParams={} } = this.state
    // 请求参数进行合并操作
    const paramsState = fetchBefore(settings, {...fetchParams, ...params})
    this.setState({
      fetchParams: paramsState
    })
    // 发送请求
    await this.fetchHandle(settings, paramsState)
  }
  // 公共请求封装
  async fetchHandle(settings, paramsState) {
    // 防止报错
    const { fetch=null } = settings
    if(fetch === null) {
      return
    }

    this.setState({
      spinning: true
    })
    // 公共请求封装
    const { dataSource=[], pagination={}} = await fetchService(settings, paramsState)
    this.setTableProps('dataSource', dataSource)
    this.setTableProps('pagination', pagination)
    this.setState({
      spinning: false
    })
  }

  render () {
    const { props, wrapItem, spinning, preload } = this.state
    const TableEle = <ScSpin spin={{spinning, tip: '正在加载中...'}}>
      <Table 
        {...props}
      />
    </ScSpin>

    if(wrapItem !== false && _.isFunction(wrapItem)) {
      return wrapItem(TableEle, preload)
    }

    return (
      <>
        {
          TableEle
        }
      </>
    )
  }
}

ScTable.propTypes = {
  props: PropTypes.object,
  settings: PropTypes.object,
  preload: PropTypes.object,
  wrapItem: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool,
  ]),
  onMount: PropTypes.func,
}

ScTable.defaultProps = {
  props: {},
  settings: {},
  wrapItem: false,  // 拖拽平台使用字段
  preload: {},      // 推拽平台使用字段
  onMount: FN
}

export default ScTable