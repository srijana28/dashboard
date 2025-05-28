import { create } from 'zustand'
import { generateMockData } from '../utils/generateMockData'
import type { DataItem, ChartType } from '../types/types'

type SortDirection = 'asc' | 'desc'
type SortField = keyof Omit<DataItem, 'id'>

interface Filters {
  category: string[]
  dateRange: {
    start: string | null
    end: string | null
  }
  valueRange: {
    min: number | null
    max: number | null
  }
}

interface DashboardState {
  data: DataItem[]
  filteredData: DataItem[]
  chartType: ChartType
  selectedRows: string[]
  searchQuery: string
  sortConfig: {
    field: SortField | null
    direction: SortDirection
  }
  filters: Filters
  setChartType: (type: ChartType) => void
  addRow: (row: Omit<DataItem, 'id'>) => void
  deleteRow: (id: string) => void
  deleteSelectedRows: () => void
  toggleRowSelection: (id: string) => void
  isRowSelected: (id: string) => boolean
  setSearchQuery: (query: string) => void
  setSortConfig: (field: SortField, direction: SortDirection) => void
  setFilters: (filters: Partial<Filters>) => void
  resetFilters: () => void
}

const initialFilters: Filters = {
  category: [],
  dateRange: {
    start: null,
    end: null
  },
  valueRange: {
    min: null,
    max: null
  }
}

const applyFilters = (data: DataItem[], filters: Filters, searchQuery: string): DataItem[] => {
  return data.filter(item => {
    // Category filter
    if (filters.category.length > 0 && !filters.category.includes(item.category)) {
      return false
    }

    // Date range filter
    if (filters.dateRange.start && item.date < filters.dateRange.start) {
      return false
    }
    if (filters.dateRange.end && item.date > filters.dateRange.end) {
      return false
    }

    // Value range filter
    if (filters.valueRange.min !== null && item.value < filters.valueRange.min) {
      return false
    }
    if (filters.valueRange.max !== null && item.value > filters.valueRange.max) {
      return false
    }

    // Search query
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase()
      return (
        item.name.toLowerCase().includes(searchLower) ||
        item.category.toLowerCase().includes(searchLower) ||
        item.value.toString().includes(searchLower) ||
        item.date.includes(searchLower)
      )
    }

    return true
  })
}

const sortData = (data: DataItem[], field: SortField | null, direction: SortDirection): DataItem[] => {
  if (!field) return data

  return [...data].sort((a, b) => {
    const aValue = a[field]
    const bValue = b[field]

    if (direction === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return bValue < aValue ? -1 : bValue > aValue ? 1 : 0
    }
  })
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  data: generateMockData(25),
  filteredData: generateMockData(25),
  chartType: 'bar',
  selectedRows: [],
  searchQuery: '',
  sortConfig: {
    field: null,
    direction: 'asc'
  },
  filters: initialFilters,
  setChartType: (type) => set({ chartType: type }),
  addRow: (row) => set((state) => {
    const newData = [...state.data, { ...row, id: `item-${Date.now()}` }]
    const filteredData = applyFilters(newData, state.filters, state.searchQuery)
    const sortedData = sortData(filteredData, state.sortConfig.field, state.sortConfig.direction)
    return { data: newData, filteredData: sortedData }
  }),
  deleteRow: (id) => set((state) => {
    const newData = state.data.filter(item => item.id !== id)
    const filteredData = applyFilters(newData, state.filters, state.searchQuery)
    const sortedData = sortData(filteredData, state.sortConfig.field, state.sortConfig.direction)
    return { data: newData, filteredData: sortedData }
  }),
  deleteSelectedRows: () => set((state) => {
    const newData = state.data.filter(item => !state.selectedRows.includes(item.id))
    const filteredData = applyFilters(newData, state.filters, state.searchQuery)
    const sortedData = sortData(filteredData, state.sortConfig.field, state.sortConfig.direction)
    return { data: newData, filteredData: sortedData, selectedRows: [] }
  }),
  toggleRowSelection: (id) => set((state) => {
    const selected = state.selectedRows.includes(id)
      ? state.selectedRows.filter(itemId => itemId !== id)
      : [...state.selectedRows, id]
    return { selectedRows: selected }
  }),
  isRowSelected: (id) => get().selectedRows.includes(id),
  setSearchQuery: (query) => set((state) => {
    const filteredData = applyFilters(state.data, state.filters, query)
    const sortedData = sortData(filteredData, state.sortConfig.field, state.sortConfig.direction)
    return { searchQuery: query, filteredData: sortedData }
  }),
  setSortConfig: (field, direction) => set((state) => {
    const sortedData = sortData(state.filteredData, field, direction)
    return { 
      sortConfig: { field, direction },
      filteredData: sortedData
    }
  }),
  setFilters: (newFilters) => set((state) => {
    const updatedFilters = { ...state.filters, ...newFilters }
    const filteredData = applyFilters(state.data, updatedFilters, state.searchQuery)
    const sortedData = sortData(filteredData, state.sortConfig.field, state.sortConfig.direction)
    return { 
      filters: updatedFilters,
      filteredData: sortedData
    }
  }),
  resetFilters: () => set((state) => {
    const filteredData = applyFilters(state.data, initialFilters, state.searchQuery)
    const sortedData = sortData(filteredData, state.sortConfig.field, state.sortConfig.direction)
    return { 
      filters: initialFilters,
      filteredData: sortedData
    }
  })
}))