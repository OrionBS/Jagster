import {CurrencyEntity} from "./CurrencyEntity";

export interface AccountEntity {
  id: number
  name: string
  description: string
  initialAmount: number
  currency: CurrencyEntity
}
