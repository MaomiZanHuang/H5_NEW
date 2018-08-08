/**
 * 简单字符串模板替换
 * @param {String} url
 * @param {Object} o
 * @return {String}
 * 示例:
 * replaceVars('/api/{id}/{ shop_id }/patch', { id: 1, shop_id: '20111' })
 * => '/api/1/20111/patch'
 */
export function replaceVars (url = '', o = {}) {
  let vars = url.match(/\{\s*[A-z|_]+\s*\}/g) || [];
  for (let key of vars) {
    let k = key.match(/[A-z|_]+/);
    if (k && k.length) {
      k = k[0];
      url = url.replace(key,
        typeof o[k] !== undefined
          ? (typeof o[k] === 'object' ? JSON.stringify(o[k]) : o[k])
          : '');
    }
  }
  return url;
};

// 将时间字符串转化为年月日
/**
 * 时间格式化
 * @description < 调用方式timeFormat.call(new Date(), 'yyyy-MM-dd hh:mm:ss') >
 * @param date
 * @param fmt
 * @return {*}
 */
export function timeFormat (date, fmt = 'yyyy-MM-dd') {
  date = new Date(date);
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return fmt;
}