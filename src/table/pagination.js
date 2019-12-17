/*
 * @Description: 
 * @Author: 鲁大师
 * @Date: 2019-10-24 15:21:16
 * @LastEditors: 鲁大师
 * @LastEditTime: 2019-10-24 15:21:19
 */
const paginationDefaultProps = (onChange, onShowSizeChange) => {
  return {
    pageSize: 20, //每页条数
    showSizeChanger: true, //是否可以改变pageSize
    total: 0,
    showTotal: (total) => total ? `共  ${total} 条` : 0,
    pageSizeOptions: ['10', '20', '30', '40'], //指定每页可以显示多少条	
    onShowSizeChange,
    onChange
  }
}

export {
  paginationDefaultProps
}