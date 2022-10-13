export interface User {
  id: number
  name: string
}

export interface Review {
  id: number
  user: User
  rating: number
  comment: string
  date: string
}

export type Reviews = Review[]
