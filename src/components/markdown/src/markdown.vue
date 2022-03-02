<script lang="ts">
import { defineComponent, nextTick, ref, watchEffect } from 'vue'
import { getArticleMd } from '@/service/article'
//懒加载函数
import lazyLoad from '@/utils/lazy-load'
import useMarkdownIt from '@/components/markdown/useMarkdownIt'
//获取md解析器，用于将md文件转html代码

export default defineComponent({
  name: 'App',
  emits: ['loaded', 'showImg'],
  props: {
    categoryName: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const content = ref()
    watchEffect(() => {
      //如果传入了categoryName和title的话，就去发送请求获取md文件
      if (props.categoryName && props.title)
        getArticleMd({
          categoryName: props.categoryName,
          title: props.title
        }).then((res: any) => {
          //使用hook，传入md文件和标签名，获取转换后的html字符串
          content.value = useMarkdownIt(res, props.categoryName)
          //在dom挂载完成后获取所有img元素进行懒加载
          nextTick(() => {
            const images = document.querySelectorAll('img')
            images.forEach(
              (item: any) => (item.onclick = () => emit('showImg', item))
            )
            lazyLoad(images)
          })
          //发射加载成功事件，并且把md文件大小发送给父组件
          emit('loaded', res.length)
        })
    })
    return {
      content
    }
  }
})
</script>
<template>
  <div>
    <div style="padding: 4px" class="markdown-body" v-html="content"></div>
  </div>
</template>
<style lang="less" scoped></style>
