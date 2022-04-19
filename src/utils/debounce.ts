export default function debounce(
  fn: any,
  time: number,
  immediate = false
) {
  //定义闭包要访问的定时器
  let timer: any = null
  //定义是否第一次要立即执行
  let isInvoke = false

  //返回一个防抖函数
  return function (...args: any) {
    if (!isInvoke && immediate) {
      isInvoke = true
      fn(...args)
    }
    //清除上一次的定时器，并且继续延迟执行
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, time)
  }
}
