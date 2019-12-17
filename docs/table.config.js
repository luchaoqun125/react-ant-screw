/*
 * @Description: 
 * @Author: 鲁大师
 * @Date: 2019-12-16 22:14:30
 * @LastEditors: 鲁大师
 * @LastEditTime: 2019-12-17 09:45:16
 */
const yourService = async (params) => {
  return function service(params) {
    return {
      dataSource: [],
      count: 0
    }
  }
}
const tableConfig = {
  settings: {
    // 请求方法
    fetch: async (params) => {
      return await yourService(params)
    },
    // 是否自动发送请求
    autoFetch: false,
    // 请求前，数据转化，行为拦截等
    // return {} 为真，进行发送请求
    fetchBefore: (params) => {
      return params
    },
    // 请求后，数据转化
    fetchAfter: (result={}) => {
      const { dataSource=[], count=0 } = result
      return {
        dataSource: dataSource,
        total: count
      }
    },
    // 默认的params参数
    defaultParams: {
      // refundType: '1',
    },
  },
  props: {
    bordered: true,
    columns: [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
      },
    ],
    rowKey: 'name',
    rowSelection: {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(selectedRowKeys, selectedRows)
      },
    },
    pagination: {},
  },
}

export {
  tableConfig
}