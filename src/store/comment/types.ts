export interface Comment {
  _id?: string
  content?: string
  title?: string
  avatar?: string
  name?: string
  createTime?: Date
  status?: string
  type?: string
  replyList?: Comment[]
}
export interface ICommentState {
  commentList: Comment[]
  allCount: number
}
