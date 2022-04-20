/**
 * content:评论内容
 * title：文章标题
 * avatar:头像
 * name：名字
 * createTIme：评论时间
 * status：评论时的状态
 * type：为1是评论，为0是子评论
 * parent：如果type为0，标记是哪个评论的子评论
 */
export interface Comment {
  _id?: string
  content: string
  replyId?: string
  title: string
  avatar?: string
  name: string
  createTime?: Date
  status?: string
  type: '0' | '1'
  parent?: string //如果type为0，标记是
  replyList?: Comment[]
}
export interface ICommentState {
  commentList: Comment[]
  allCount: number
}
