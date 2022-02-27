export interface Article {
  categoryId: string
  title: string
  createTime: string
  count: number
  description: string
}
export interface IArticleType {
  articleList: Article[]
  allCount: number
}
