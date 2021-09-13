//防抖操作,对于refresh调用非常频繁
//第一个参数为函数 第二个参数为时间
export function debounce(func,delay) {
    let timer = null
    return function(...args) {
      if(timer) clearTimeout(timer)
      timer = setTimeout(()=> {
        func.apply(this,args)
        // console.log(func,args)
      },delay)
    }
  }

//正则表达式 匹配字符串利器
//y+ -> 匹配1个或多个y
//y* -> 匹配0个或多个y
//y? -> 匹配0ge或1个y

export function formatDate(date, fmt) {
  //1.获取年份
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    }
  //2.获取月、日、时、分
    let o = {
      "M+": date.getMonth() + 1,
      "d+": date.getDate(),
      "h+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds(),
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + "";
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length === 1 ? str : padLeftZero(str)
        );
      }
    }
    return fmt;
  }
  
  //避免出现4：4：4
  //如果只有1位将进行补齐
  function padLeftZero(str) {
    return ("00" + str).substr(str.length);
  }  