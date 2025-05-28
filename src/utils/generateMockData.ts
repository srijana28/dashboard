import type { DataItem } from '../types/types'
import { CATEGORIES } from './constants'

const generateRandomDate = (start: Date, end: Date): string => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  return date.toISOString().split('T')[0]
}

export const generateMockData = (count: number): DataItem[] => {
  const result: DataItem[] = []
  
  for (let i = 0; i < count; i++) {
    result.push({
      id: `item-${i}`,
      name: `Product ${i + 1}`,
      value: Math.floor(Math.random() * 1000) + 100,
      category: CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)],
      date: generateRandomDate(new Date(2020, 0, 1), new Date(2023, 11, 31))
    })
  }
  
  return result
}