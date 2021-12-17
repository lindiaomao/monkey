//过滤功能
const digitsRE = /(\d{3})(?=\d)/g;

export default (value, currency = '元', decimals = 2) => {
  value = parseFloat(value);
  if (!value && value !== 0) return '';
  const stringified = Math.abs(value).toFixed(decimals);
  const $int = decimals ? stringified.slice(0, -1 - decimals) : stringified;
  const i = $int.length % 3;
  const head = i > 0 ? ($int.slice(0, i) + ($int.length > 3 ? ',' : '')) : '';
  const $float = decimals ? stringified.slice(-1 - decimals) : '';
  const sign = value < 0 ? '-' : '';
  return `${sign}${head}${$int.slice(i).replace(digitsRE, '$1,')}${$float} ${currency}`;
};


//在main.js全局注册
import numFormat from '@/libs/numFormat';
// 注册金额格式化过滤器
Vue.filter('numFormat', numFormat);

//使用
{{item.outsourceAmount | numFormat}}