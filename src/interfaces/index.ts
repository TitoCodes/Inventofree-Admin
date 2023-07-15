export type UserPayloadObject = {
  name: string
  email: string
  avatar: string
}

export type MenuAsideItem = {
  label: string
  icon?: string
  href?: string
  target?: string
  color?: ColorButtonKey
  isLogout?: boolean
  menu?: MenuAsideItem[]
}

export type MenuNavBarItem = {
  label?: string
  icon?: string
  href?: string
  target?: string
  isDivider?: boolean
  isLogout?: boolean
  isDesktopNoLabel?: boolean
  isToggleLightDark?: boolean
  isCurrentUser?: boolean
  menu?: MenuNavBarItem[]
}

export type ColorKey = 'white' | 'light' | 'contrast' | 'success' | 'danger' | 'warning' | 'info'

export type ColorButtonKey =
  | 'white'
  | 'whiteDark'
  | 'lightDark'
  | 'contrast'
  | 'success'
  | 'danger'
  | 'warning'
  | 'info'
  | 'void'

export type BgKey = 'purplePink' | 'pinkRed'

export type TrendType = 'up' | 'down' | 'success' | 'danger' | 'warning' | 'info'

export type TransactionType = 'withdraw' | 'deposit' | 'invoice' | 'payment'

export type Transaction = {
  id: number
  amount: number
  account: string
  name: string
  date: string
  type: TransactionType
  business: string
}

export type Category = {
  id: number
  name: string
  description: string
  createdDate: string
  createdBy: number
  modifiedDate: string
  updatedBy: number
}

export type AuditTrail = {
  id: number
  action: string
  details: string
  createdBy: number
}

export type Item = {
  id: number
  name: string
  detail: string
  category: Category
  price: Price
  createdDate: string
  createdBy: number
  modifiedDate: string
  updatedBy: number
}

export type AddItem = {
  name?: string
  detail?: string
  categoryId?: Category
  price?: Price
  createdBy?: number
}

export type UpdateItem = {
  id?:number
  name?: string
  detail?: string
  price?: Price
  createdBy?: number
}

export type Price = {
  currencyType: number
  amount: number
}

export type StyleKey = 'white' | 'basic'

export type UserForm = {
  name: string
  email: string
}
