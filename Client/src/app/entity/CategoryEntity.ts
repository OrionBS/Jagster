import {TransactionEntity} from "./TransactionEntity";

export interface CategoryEntity {
  id: number
  name: string
  icon: string
  transactions?: TransactionEntity[]
}
