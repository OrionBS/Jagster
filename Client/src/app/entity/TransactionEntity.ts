import {CategoryEntity} from "./CategoryEntity";
import {AccountEntity} from "./AccountEntity";

export interface TransactionEntity {
  id: number
  description: string
  date: Date
  amount: number
  category: CategoryEntity
  account?: AccountEntity
}
