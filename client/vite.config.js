import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // 路径别名
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@store': path.resolve(__dirname, './src/store'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@services': path.resolve(__dirname, './src/services'),
      '@styles': path.resolve(__dirname, './src/styles'),
    },
  },

  // 开发服务器配置
  server: {
    port: 3000,
    proxy: {
      // 代理 API 请求到后端
      '/api': {
        target: 'http://localhost:8787',
        changeOrigin: true,
      },
      '/upload': {
        target: 'http://localhost:8787',
        changeOrigin: true,
      },
      '/file': {
        target: 'http://localhost:8787',
        changeOrigin: true,
      },
    },
  },

  // 构建配置
  build: {
    outDir: '../public',
    emptyOutDir: true,
    sourcemap: false,
    
    // 代码分割
    rollupOptions: {
      output: {
        manualChunks: {
          // React 核心库
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // 状态管理和数据请求
          'state-vendor': ['zustand', 'axios'],
          // UI 和动画库
          'ui-vendor': ['framer-motion', 'react-hot-toast', 'react-dropzone'],
        },
      },
    },
    
    // 优化配置
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild',
    target: 'es2015',
  },

  // 优化依赖预构建
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'zustand',
      'axios',
      'framer-motion',
      'react-hot-toast',
      'react-dropzone',
    ],
  },
});
