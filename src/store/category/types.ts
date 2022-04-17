import { Article } from './../article/types'

export interface Category {
  _id: string
  categoryName: string
  list: Article[]
}
export interface ICategoryState {
  categoryList: Category[]
  allCount: number
}
