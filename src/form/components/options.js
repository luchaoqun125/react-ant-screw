/*
 * @Description: 
 * @Author: 鲁大师
 * @Date: 2019-10-20 18:42:20
 * @LastEditors: 鲁大师
 * @LastEditTime: 2019-10-20 18:48:09
 */
async function optionsHandle(options=[]) {
  if(typeof options === 'function') {
    return await options()
  } else {
    return options
  }
}

export default optionsHandle
