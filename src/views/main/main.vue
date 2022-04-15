<script lang="ts" setup>
import myArticleCard from '../../components/articleCard'
import myInfoCard from '../../components/infoCard/src/InfoCard.vue'
import classifyCard from '@/components/classifyCard'
import websiteInfoCard from '@/components/websiteInfoCard'
import sentence from './sentence.vue'
import { useGetMainData } from '@/views/main/index'
import { onUpdated, onBeforeUpdate, ref, Ref } from 'vue'
import { useStore } from '@/store'
// 获取信息
const { articleList, categoryList, categoryClick } = useGetMainData()
//点击箭头滚动
const scrollToContent = () => {
  window.scrollTo({
    top: window.innerHeight,
    left: 0,
    behavior: 'smooth'
  })
}

let observer: IntersectionObserver | null = null
const components: Ref<HTMLElement[] | null> = ref(null)
onBeforeUpdate(() => {
  observer = null
})
onUpdated(() => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.className = 'fadeIn animate article-card'
        observer!.unobserve(entry.target)
      }
    })
  })
  if (components.value)
    components.value.forEach((item) => {
      if (observer) observer.observe(item)
    })
})

const store = useStore()
</script>

<template>
  <div class="main">
    <div class="bg">
      <div class="title">欢迎来到勾勾的小站</div>
      <sentence class="sentence" />
      <div class="arrow" @click="scrollToContent"></div>
    </div>
    <div class="content" id="content">
      <div class="article-list">
        <div class="bread-crumbs">
          <div class="bread-title">当前分类：{{ store.state.currentCategory }}</div>
        </div>

        <div
          class="animate article-card"
          v-for="(item, index) in articleList"
          :key="item._id"
          ref="components"
          @click="$router.push(`/article/${item._id}`)"
        >
          <my-article-card :index="index" :item="item" />
        </div>
      </div>
      <div class="card-list">
        <my-info-card />
        <classify-card class="hide-in-mobile" @categoryClick="categoryClick" :list="categoryList" />
        <website-info-card class="hide-in-mobile" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@media only screen and (max-width: 1150px) {
  .bg {
    .title {
      font-size: 1.5rem;
    }
    .sentence {
      font-size: 1rem;
    }
  }

  .content {
    flex-direction: column-reverse;
    align-items: center;
  }
  .card-list {
    margin-left: 0;
  }
}
@media only screen and (max-width: 600px) {
  //右侧卡片列表
  .card-list {
    width: 97vw;
  }
  .article-list {
    width: 97vw;
    .article-card {
      height: 33vh;
      min-height: 250px;
    }
  }
  /*-------------------------------------------------*/
  .hide-in-mobile {
    display: none;
  }
}
@media only screen and (max-width: 1150px) and (min-width: 601px) {
  //右侧卡片列表
  .card-list {
    width: 80vw;
  }
  .article-list {
    width: 80vw;
    .article-card {
      height: 33vh;
      min-height: 300px;
    }
  }
  /*-------------------------------------------------*/
}
@media only screen and (min-width: 1151px) {
  //右侧卡片列表
  .card-list {
    width: 300px;
    margin-left: 20px;
  }
  .article-list {
    width: 800px;
    .article-card {
      height: 33vh;
      min-height: 250px;
    }
  }
  .bg {
    .title {
      font-size: 2.5rem;
    }
    .sentence {
      font-size: 1.5rem;
    }
  }
  /*-------------------------------------------------*/

  .content {
    flex-direction: row;
    justify-content: center;
  }
}
.main {
  width: 100%;
  height: 100%;
  transition: all 0.5s;
  .bg {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: url('https://img.jzsp66.xyz/bg.35f0cd6d.webp');
    background-size: cover;
    // 设置背景图位置
    background-position: center;
    position: relative;
    .title {
      color: white;
      font-weight: bold;
      text-align: center;
      margin-bottom: 20px;
    }
    .sentence {
      padding: 0 20px;
      color: white;
      text-align: center;
      font-weight: 200;
    }

    @keyframes upAndDown {
      from {
        bottom: 30px;
        border-top: 0.3rem solid silver;
        border-right: 0.3rem solid silver;
      }
      to {
        bottom: 20px;
        border-top: 0.3rem solid white;
        border-right: 0.3rem solid white;
      }
    }
    .arrow {
      position: absolute;
      width: 10px;
      height: 10px;
      cursor: pointer;
      transform: rotate(135deg);
      animation: upAndDown 1.5s linear alternate-reverse infinite;
    }
  }

  .content {
    width: 100%;
    display: flex;

    .article-list {
      .article-card {
        margin-bottom: 1rem;
      }
      .bread-crumbs {
        background-color: white;
        padding: 1rem 0;
        border-radius: 0.4rem;
        margin: 1rem 0;
        box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.5);
        .bread-title {
          margin-left: 1rem;
        }
      }
    }

    .card-list {
      margin-top: 1rem;
      div {
        margin-bottom: 1rem;
      }
    }
  }
}
</style>
