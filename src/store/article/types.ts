export interface Article {
  _id?: string
  categoryName?: string
  content?: string
  count?: number
  createTime?: Date
  description?: string
  labelList?: any[]
  title?: string
  updateTime?: Date
}
export interface IArticleState {
  articleList: Article[]
  allCount: number
}
