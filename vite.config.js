import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      '@mui/x-charts/ResponsiveChartContainer', 
      '@mui/x-charts/LineChart', 
      '@mui/icons-material/ArrowDropUp',
      '@mui/icons-material/ArrowDropDown',
      '@mui/icons-material/LightMode',
      '@mui/icons-material/DarkModeOutlined',
      '@mui/icons-material/GitHub',
      '@mui/icons-material/Close'
    ]
  }
})
