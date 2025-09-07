import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // se não for React, remova esta linha e o plugin

export default defineConfig({
  plugins: [react()], // remova se não usar React
  base: '/convertedor-de-arquivos/'
})
