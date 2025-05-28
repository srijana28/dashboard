import React from 'react'
import { Box, ButtonGroup, Button, Typography } from '@mui/material'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useDashboardStore } from '../../stores/dashboardStore'
import { CHART_TYPES, CATEGORIES } from '../../utils/constants'
import type { ChartType, DataItem } from '../../types/types'

// Define colors for each category
const CATEGORY_COLORS = {
  Electronics: '#0088FE',
  Clothing: '#00C49F',
  Food: '#FFBB28',
  Furniture: '#FF8042',
  Toys: '#8884D8'
}

const renderChart = (data: DataItem[], type: ChartType): React.ReactElement => {
  if (!data.length) {
    return <Typography>No data available</Typography>;
  }

  const categoryData = data.reduce<Array<{ category: string; value: number }>>((acc, item) => {
    const existing = acc.find(i => i.category === item.category)
    if (existing) {
      existing.value += item.value
    } else {
      acc.push({ category: item.category, value: item.value })
    }
    return acc
  }, [])

  switch (type) {
    case 'bar':
      return (
        <BarChart data={categoryData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8">
            {categoryData.map((entry) => (
              <Cell key={`cell-${entry.category}`} fill={CATEGORY_COLORS[entry.category as keyof typeof CATEGORY_COLORS]} />
            ))}
          </Bar>
        </BarChart>
      )
    case 'line':
      return (
        <LineChart data={categoryData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      )
    case 'pie':
      return (
        <PieChart>
          <Pie
            data={categoryData}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            nameKey="category"
          >
            {categoryData.map((entry) => (
              <Cell 
                key={`cell-${entry.category}`} 
                fill={CATEGORY_COLORS[entry.category as keyof typeof CATEGORY_COLORS]}
                name={entry.category}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend 
            formatter={(value) => `${value}`}
            payload={
              CATEGORIES.map(category => ({
                value: category,
                type: 'square',
                color: CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS]
              }))
            }
          />
        </PieChart>
      )
    default:
      return <Typography>Unsupported chart type</Typography>;
  }
}

export default function ChartPanel() {
  const { data, chartType, setChartType } = useDashboardStore()

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Sales Data Visualization
      </Typography>
      
      <ButtonGroup sx={{ mb: 2 }}>
        {CHART_TYPES.map((type) => (
          <Button
            key={type}
            variant={chartType === type ? 'contained' : 'outlined'}
            onClick={() => setChartType(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Button>
        ))}
      </ButtonGroup>
      
      <Box sx={{ height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart(data, chartType)}
        </ResponsiveContainer>
      </Box>
    </Box>
  )
}