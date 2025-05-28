export interface DataItem {
  id: string
  name: string
  value: number
  category: string
  date: string
}

export type ChartType = 'bar' | 'line' | 'pie'