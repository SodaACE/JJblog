export interface Article {
  _id: string
  categoryId: string
  categoryName: string
  title: string
  createTime: string
  count: number
  description: string
}
export interface IArticleType {
  articleList: Article[]
  allCount: number
}
