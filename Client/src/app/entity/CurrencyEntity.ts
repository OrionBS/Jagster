import {AccountEntity} from "./AccountEntity";

export interface CurrencyEntity {
  id: number
  name: string
  code: string
  symbol: string
  accounts?: AccountEntity[]
}
