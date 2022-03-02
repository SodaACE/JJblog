<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { ref, watchEffect } from 'vue'
import { getArticleList, addArticleCount } from '@/service/article'
import lazyLoad from '@/utils/lazy-load'
import markdown from '@/components/markdown/src/markdown.vue'
const article = ref({})
const count = ref(0)
const time = ref(0)
const path = ref({})
const route = useRoute()
watchEffect(() => {
  let id = route.params.id
  getArticleList({ _id: id }).then((res) => {
    article.value = res.data!.list[0]
    console.log(encodeURI(res.data!.list[0].title))
    path.value = {
      categoryName: res.data!.list[0].categoryName,
      title: encodeURI(res.data!.list[0].title)
    }
  })
  addArticleCount({ _id: id })
})

const loaded = (length: any) => {
  count.value = Math.floor(length / 4)
  time.value = Math.floor(count.value / 360)
}
//浏览图片
const showImgContent = ref()
const isShowImg = ref(false)
let newImg: any
const showImg = (img: any) => {
  newImg = document.createElement('img')
  newImg.style.width = '90%'
  newImg.setAttribute('src', img.getAttribute('src'))
  showImgContent.value.appendChild(newImg)
  isShowImg.value = true
}
const unShowImg = () => {
  showImgContent.value.removeChild(newImg)
  isShowImg.value = false
}
</script>
<template>
  <div class="show-article">
    <div
      class="showImg"
      ref="showImgContent"
      @click="unShowImg"
      :style="{ left: isShowImg ? '0' : '100%' }"
    ></div>
    <div class="bg">
      <div class="title">{{ article.title }}</div>
      <div class="line">
        <div>
          <el-icon><calendar /></el-icon>
          <span class="font">
            发表于：{{ $filters.formatTime(article.createTime) }}</span
          >
        </div>
        <div>
          <el-icon><folder-opened /></el-icon>
          <span class="font">属于：{{ article.categoryName }}</span>
        </div>
      </div>
      <div class="line">
        <div>
          <el-icon><document /></el-icon>
          <span class="font">字数总计：{{ count }}</span>
        </div>
        <div>
          <el-icon><timer /></el-icon>
          <span class="font">阅读时长：{{ time }}分钟</span>
        </div>
        <div>
          <img
            src="../../assets/icon/see.png"
            alt=""
            style="height: 17px; width: 17px"
          />
          <span class="font">访问量：{{ article.count }}</span>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="md">
        <markdown @showImg="showImg" @loaded="loaded" v-bind="path"></markdown>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@media only screen and (max-width: 600px) {
  .md {
    width: 80vw;
  }
  .font {
    font-size: 13px;
  }
  .title {
    font-size: 20px;
  }
  .line {
    display: flex;
    flex-direction: column;
    width: 200px;
    margin: 0;
    margin-left: 15px;
    .font {
      margin-left: 5px;
    }
  }
}
@media screen and (max-width: 1150px) and (min-width: 601px) {
  .md {
    width: 80vw;
  }
  .title {
    font-size: 40px;
  }
  .line {
    div:not(:last-of-type) {
      border-right: 2px solid white;
    }
  }
}
@media only screen and (min-width: 1151px) {
  .md {
    width: 800px;
  }
  .title {
    font-size: 40px;
  }
  .line {
    div:not(:last-of-type) {
      border-right: 2px solid white;
    }
  }
}
.show-article {
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  .showImg {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 100%;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 11;
    transition: all 0.5s;
    overflow: scroll;
  }
  .bg {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    width: 100%;
    height: 45vh;
    background: url('../../assets/bg/bg2.png');
    background-position: top;

    .title {
      margin-bottom: 15px;
    }

    .line {
      font-size: 17px;
      line-height: 1.3;
      display: flex;

      div {
        padding: 0 8px;
        margin-bottom: 5px;
        display: flex;
        align-items: center;
        font {
          font-weight: 500;
        }
      }
    }
  }
  .content {
    position: relative;
    display: flex;
    justify-content: center;
    .md {
      padding: 20px;
      margin-top: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    }
    @keyframes wave {
      from {
        background-position: 0 bottom;
      }
      to {
        background-position: 1000% bottom;
      }
    }
    //animation: wave 60s linear alternate infinite;
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 82px;
      position: absolute;
      top: -82px;
      z-index: 1;
      background-image: url('../../assets/icon/wave.png');
      background-repeat: repeat-x;
      animation: wave 60s linear alternate infinite;
    }
  }
}
</style>
