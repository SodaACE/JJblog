import commentsCard from './src/commentsCard.vue'
import { debounce } from '@/utils/throttle'
import { ref, reactive, watchEffect } from 'vue'
import { getqqInfo } from '@/service/comments'
export default commentsCard

export function useCommentInfo() {
  //评论内容
  const content = ref('')
  const info = reactive({
    avatar:
      'https://gravatar.loli.net/avatar/cc2c230b42f7823fe819f40d7e06532a?d=mp&v=1.4.16',
    name: '',
    email: '',
    status: ''
  })

  const findInfoByQQ = debounce(function () {
    getqqInfo(info.name).then((res) => {
      if (res.data.code === 200) {
        info.name = res.data.name
        info.email = res.data.mail
        info.avatar = res.data.imgurl
      }
    })
  }, 200)
  return {
    content,
    info,
    findInfoByQQ
  }
}
