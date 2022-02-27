export default function (imgs: NodeList) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const image: any = entry.target
        console.log(image)
        const data_src = image.dataset.src
        console.log(data_src)
        image.setAttribute('src', data_src)
        observer.unobserve(image)
      }
    })
  })
  imgs.forEach((image: any) => {
    if (!image.getAttribute('src')) {
      observer.observe(image)
    }
  })
}
