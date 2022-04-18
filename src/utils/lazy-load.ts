//使用IntersectionObserver实现路由懒加载
export default function (imgs: NodeList) {
  //创建Observer实例，传入的回调函数会在ovserve的对象与屏幕交叉时触发，entries是所有被observe对象的状态，其中isIntersecting保存了是否出现在屏幕中
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      //如果出现在屏幕中，就赋值src发送请求，并且解除监听，避免重复操作
      if (entry.isIntersecting) {
        const image: HTMLImageElement =
          entry.target as HTMLImageElement
        const data_src = image.dataset.src ?? ''
        image.setAttribute('src', data_src)
        image.removeAttribute('data-src')
        observer.unobserve(image)
      }
    })
  })
  //如果有src属性就不监听了
  imgs.forEach((image: any) => {
    if (!image.getAttribute('src')) {
      observer.observe(image)
    }
  })
}
