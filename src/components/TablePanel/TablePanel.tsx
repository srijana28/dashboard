import { useState } from 'react'
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Paper,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  TextField,
  Typography,
  Stack
} from '@mui/material'
import { Delete as DeleteIcon, Add as AddIcon, Search as SearchIcon, FilterList as FilterIcon } from '@mui/icons-material'
import { useDashboardStore } from '../../stores/dashboardStore'
import { CATEGORIES } from '../../utils/constants'
import type { DataItem } from '../../types/types'

export default function TablePanel() {
  const {
    filteredData,
    selectedRows,
    addRow,
    deleteRow,
    deleteSelectedRows,
    toggleRowSelection,
    isRowSelected,
    setSearchQuery,
    setSortConfig,
    setFilters,
    resetFilters,
    sortConfig,
    filters
  } = useDashboardStore()
  
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null)
  const [newRow, setNewRow] = useState({
    name: '',
    value: '',
    category: '',
    date: ''
  })

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleAddRow = () => {
    if (newRow.name && newRow.value && newRow.category && newRow.date) {
      addRow({
        name: newRow.name,
        value: Number(newRow.value),
        category: newRow.category,
        date: newRow.date
      })
      setNewRow({
        name: '',
        value: '',
        category: '',
        date: ''
      })
    }
  }

  const handleSort = (field: keyof Omit<DataItem, 'id'>) => {
    const isAsc = sortConfig.field === field && sortConfig.direction === 'asc'
    setSortConfig(field, isAsc ? 'desc' : 'asc')
  }

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget)
  }

  const handleFilterClose = () => {
    setFilterAnchorEl(null)
  }

  const handleCategoryFilter = (category: string) => {
    const currentCategories = filters.category
    const updatedCategories = currentCategories.includes(category)
      ? currentCategories.filter(c => c !== category)
      : [...currentCategories, category]
    
    setFilters({ category: updatedCategories })
  }

  // Get current page data
  const currentPageData = filteredData.slice(page * rowsPerPage, (page + 1) * rowsPerPage)

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Sales Data Table
      </Typography>
      
      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <TextField
          placeholder="Search..."
          size="small"
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ width: 200 }}
        />
        
        <IconButton onClick={handleFilterClick}>
          <FilterIcon color={filters.category.length > 0 ? "primary" : "inherit"} />
        </IconButton>
        
        {filters.category.length > 0 && (
          <Button
            size="small"
            onClick={resetFilters}
          >
            Clear Filters
          </Button>
        )}
      </Stack>

      <Popover
        open={Boolean(filterAnchorEl)}
        anchorEl={filterAnchorEl}
        onClose={handleFilterClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 2, minWidth: 200 }}>
          <Typography variant="subtitle2" gutterBottom>
            Filter by Category
          </Typography>
          {CATEGORIES.map(category => (
            <MenuItem key={category} onClick={() => handleCategoryFilter(category)}>
              <Checkbox
                checked={filters.category.includes(category)}
                size="small"
              />
              {category}
            </MenuItem>
          ))}
        </Box>
      </Popover>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Name"
          size="small"
          value={newRow.name}
          onChange={(e) => setNewRow({ ...newRow, name: e.target.value })}
        />
        <TextField
          label="Value"
          size="small"
          type="number"
          value={newRow.value}
          onChange={(e) => setNewRow({ ...newRow, value: e.target.value })}
        />
        <TextField
          label="Category"
          size="small"
          value={newRow.category}
          onChange={(e) => setNewRow({ ...newRow, category: e.target.value })}
        />
        <TextField
          label="Date"
          size="small"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={newRow.date}
          onChange={(e) => setNewRow({ ...newRow, date: e.target.value })}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddRow}
        >
          Add
        </Button>
      </Box>
      
      {selectedRows.length > 0 && (
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={deleteSelectedRows}
          sx={{ mb: 2 }}
          color="error"
        >
          Delete Selected ({selectedRows.length})
        </Button>
      )}
      
      <TableContainer component={Paper} sx={{ height: 'auto', minHeight: 200, maxHeight: 500, mb: 2 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedRows.length > 0 && selectedRows.length < currentPageData.length
                  }
                  checked={
                    currentPageData.length > 0 &&
                    currentPageData.every(row => isRowSelected(row.id))
                  }
                  onChange={() => {
                    if (currentPageData.every(row => isRowSelected(row.id))) {
                      currentPageData.forEach(row => toggleRowSelection(row.id))
                    } else {
                      currentPageData.forEach(row => {
                        if (!isRowSelected(row.id)) {
                          toggleRowSelection(row.id)
                        }
                      })
                    }
                  }}
                />
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.field === 'name'}
                  direction={sortConfig.field === 'name' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.field === 'value'}
                  direction={sortConfig.field === 'value' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('value')}
                >
                  Value
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.field === 'category'}
                  direction={sortConfig.field === 'category' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('category')}
                >
                  Category
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.field === 'date'}
                  direction={sortConfig.field === 'date' ? sortConfig.direction : 'asc'}
                  onClick={() => handleSort('date')}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPageData.map((row) => (
              <TableRow key={row.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isRowSelected(row.id)}
                    onChange={() => toggleRowSelection(row.id)}
                  />
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.value}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => deleteRow(row.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        component="div"
        count={filteredData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />
    </Box>
  )
}