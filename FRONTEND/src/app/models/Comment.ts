import {Question} from "./Question"
import {User} from "./User"

export interface Comment {
  id: string
  content: string
  user: User
  question: Question
}
