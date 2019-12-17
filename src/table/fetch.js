/*
 * @Description: 
 * @Author: 鲁大师
 * @Date: 2019-09-16 16:04:01
 * @LastEditors: 鲁大师
 * @LastEditTime: 2019-10-24 15:45:14
 */
import _ from 'lodash'
// 请求前数据更改和缓存, 返回数据存储在state内
const fetchBefore = (settings, params={}) => {
  const { fetchBefore=null, defaultParams={}} = settings

  params = {
    ...defaultParams,
    ...params,
  }
  if(fetchBefore) {
    params = fetchBefore(params)
  }
  return params
}

// 请求方法
const fetchService = async (settings={}, params={}) => {
  const { fetch, fetchAfter=null} = settings

  params = {
    page: 1,
    pageSize: 20,
    ...params,
  }
  
  let fetchResult = await fetch(params)
  if(fetchAfter) {
    fetchResult = fetchAfter(fetchResult)
  }
  if(_.isArray(fetchResult)) {
    fetchResult = fetchResult[0]
  }

  const List = fetchResult.dataSource || fetchResult.list || []
  const dataSource = List.map((item, index)=>{
    return {...item, key: params.page+'_'+params.pageSize+'_'+index }
  })

  const result = {
    dataSource,
    pagination: {
      total: fetchResult.totalCount,
      current: params.page,
      pageSize: params.pageSize
    }
  }
  return result
}

export {
  fetchService,
  fetchBefore
}