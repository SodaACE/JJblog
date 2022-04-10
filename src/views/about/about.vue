<script lang="ts" setup>
const arr = [
  {
    label: 'javascript',
    percentage: 70,
    color: '#beedc7'
  },
  {
    label: 'html+css',
    percentage: 60,
    color: '#19caad'
  },
  {
    label: 'vue',
    percentage: 65,
    color: '#a0eee1'
  },
  {
    label: 'typescript',
    percentage: 45,
    color: '#ecad9e'
  },
  {
    label: 'webpack',
    percentage: 35,
    color: '#d1ba74'
  },
  {
    label: 'node',
    percentage: 60,
    color: '#e6ceac'
  }
]
</script>
<template>
  <div class="about">
    <div class="info">
      <h3>个人简介</h3>
      <div class="content">
        <img src="../../assets/icon/avatar.jpg" alt="" />
        <div style="padding: 0 40px">
          <p class="name">wjj（勾勾）</p>
          <p class="description">
            01年水瓶座一枚，喜欢打游戏，听音乐，吃各种小吃。喜欢前端的网页开发带来的成就感，对数学感兴趣，敢于解决问题。
          </p>
        </div>
      </div>
    </div>
    <div class="footer">
      <div style="display: flex; width: 890px">
        <div class="skill-block">
          <h4>技能点</h4>
          <div class="skill" v-for="item in arr" :key="item.label">
            <div style="width: 100px">{{ item.label }}</div>
            <el-progress
              :color="item.color"
              style="width: 300px"
              :text-inside="true"
              :stroke-width="26"
              :percentage="item.percentage"
            />
          </div>
        </div>
        <div class="about-skill">
          <p>熟悉JavaScript的语法，了解TypeScript，掌握ES6常用语法</p>
          <p>熟悉vue2/3全家桶，了解vue响应式原理实现</p>
          <p>熟悉node+express编写后端接口</p>
          <p>了解webpack和vite等打包工具</p>
          <p>了解uniapp跨端开发</p>
        </div>
      </div>
      <div style="display: flex; flex-direction: column; width: 890px">
        <h4 style="margin-right: 720px">项目经历</h4>
        <div class="project">
          <div class="title">个人博客系统</div>
          <div>
            页面地址：
            <a href="http://www.fjxiangcun.com/">http://www.baidu.com/</a>
          </div>
          <p>项目介绍：</p>
          <p style="line-height: 1.4; font-weight: 500">
            个人项目，从2022年02月18日开始开发，包括个人博客，后台管理，以及后端部分。前端用vue3全家桶+ts+less+element-ui开发，后端用express+mongodb进行开发，使用axios进行前后端交互。
            目前可以通过个人博客网站查看文章数据，后台已经实现文章管理模块和分类管理模块以及文件上传模块，共计10个接口，功能仍在积极拓展中。
          </p>
          <p>项目亮点：</p>
          <p>1：前端使用vue3的composition API结合typescript类型声明进行开发</p>
          <p>2：后台开发时封装page-content组件并在页面之间进行复用，传入配置对象可以快速构建页面</p>
          <p>3：使用IntersectionObserve进行懒加载，避免一次性发送全部请求</p>
          <p>4：node编写后端，配合中间件进行开发</p>
          <p>5：个人博客的大部分页面对手机端进行了适配</p>
        </div>
        <div class="project">
          <div class="title">富家乡村网上纪念馆</div>
          <div>
            页面地址：
            <a href="http://www.fjxiangcun.com/">http://www.fjxiangcun.com/</a>
          </div>
          <p style="line-height: 1.4; font-weight: 500">
            团队项目，开发周期为1个月，个人负责前台与后台部分。前台与后台用vue2全家桶+element-ui开发，通过axios进行前后端交互。前台作为商用网站，有10+个页面，经过不断地优化，即将投入使用。后台包括用户管理，角色管理，墓碑信息管理等模块。
          </p>
          <p>项目亮点：</p>
          <p>1：后台使用动态路由进行权限管理</p>
          <p>2：使用vuex对数据进行统一管理，简化了繁琐的父子组件通信</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.about {
  width: 100%;
  height: 100%;
  background: url('https://img.jzsp66.xyz/aboutBg.032563ba.png');
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 800px;
  .info {
    width: 100%;
    min-height: 500px;
    background: url('http://img.jzsp66.xyz/aboutTopBg.62862b8c.webp');
    background-size: cover;
    background-position: top;
    display: flex;
    flex-direction: column;
    align-items: center;

    .content {
      display: flex;
      width: 800px;
      img {
        height: 100px;
        width: 100px;
        border-radius: 50%;
        cursor: pointer;
      }
      .name {
        color: white;
        font-size: 36px;
        padding: 0;
        margin: 0 0 25px 0;
      }
      .description {
        color: white;
        font-size: 16px;
        padding-bottom: 18px;
        border-bottom: 1px dashed #fff;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
          'Noto Sans', 'Liberation Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
          'Segoe UI Symbol', 'Noto Color Emoji';
        font-weight: 400;
        line-height: 1.5;
        text-align: left;
      }
    }
    h3 {
      font-size: 24px;
      color: #fff;
      background-image: url('../../assets/icon/line_wave_w.png');
      padding: 0 3px 15px 3px;
      margin-top: 60px;
      margin-right: 700px;
      background-repeat: repeat-x;
      background-position: 0 bottom;
      display: inline-block;
    }
  }
  .footer {
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    h4 {
      color: #ffa9be;
      font-family: Arvo, sans-serif;
      font-size: 18px;
      letter-spacing: 0.15em;
      display: inline-block;
      width: 150px;
      border-bottom: #ffa9be solid 2px;
      line-height: 1.4em;
      margin-bottom: 24px;
      padding-bottom: 6px;
      margin-right: 190px;
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
      content: ' ';
      display: block;
      width: 100%;
      height: 83px;
      position: absolute;
      left: 0;
      top: -82px;
      z-index: 1;
      background-image: url('../../assets/icon/wave.png');
      background-repeat: repeat-x;
      //调整水平位置
      animation: wave 60s linear alternate infinite;
    }
    .skill-block {
      .skill {
        width: 450px;
        display: flex;
        margin-bottom: 10px;
      }
    }
    .about-skill {
      margin-top: 62px;
      p {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
          'Noto Sans', 'Liberation Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
          'Segoe UI Symbol', 'Noto Color Emoji';
        font-size: 17px;
        font-weight: 600;
      }
    }
    .project {
      margin: 20px 0 20px 0;
      .title {
        font-size: 24px;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
