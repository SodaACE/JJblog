const delay = 1000
export default function throttle(
  fn: (...args: any) => any,
  options = { leading: false, trailing: true }
) {
  //记录上一次保存的时间
  let oldTime = 0
  let timer: any = null
  //返回一个节流函数
  return function (...args: any) {
    //计算当前时间
    const nowTime = new Date().getTime()
    //这是初始化，判断需不需要执行第一次请求。我们默认oldTime是0，第一次请求是会立即执行的
    if (oldTime === 0 && !options.leading) oldTime = new Date().getTime()

    //如果时间间隔大于delay，就执行，并且重置oldTime
    if (nowTime - oldTime > delay) {
      oldTime = nowTime
      return fn(...args)
      //如果时间间隔小于，并且需要尾部执行且没有设置过定时器（定时器设置一个就可以，因为尾部只需要执行一次）
    } else if (options.trailing && !timer) {
      //定时器，设置到周期尾部的时候执行
      timer = setTimeout(() => {
        timer = null
        //如果是需要首部立即执行的话，设置时间间隔为
        oldTime = !options.leading ? 0 : new Date().getTime() + delay
        return fn(...args)
      }, delay)
    }
  }
}
