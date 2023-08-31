/*
 * @Description:
 * @Author: swz
 * @Date: 2022-11-01 10:11:38
 * @LastEditTime: 2023-06-21 17:44:09
 * @LastEditors: swz
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import * as path from "path";
import qiankun from 'vite-plugin-qiankun'
const useDevMode = true

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  plugins: [
    vue(),
    qiankun('subapp', { useDevMode })
  ],
  publicDir: '../public',
  // server: {
  //   open: true,//项目启动后打开默认浏览器
  //   proxy: {
  //     '/api': {
  //           target: 'http://172.19.20.12:9201',
  //       changeOrigin: true,
  //           secure:false,
  //           rewrite:(path) => path.replace(/^\/api/,""),
  //     },
  //   },
  // },
  build: {
    chunkSizeWarningLimit:1500,
    rollupOptions: {
      // 配置rollup的一些构建策略
      output: {
        // 最小化拆分包
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        }, 
        // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
        entryFileNames: "js/[name].[hash].js", 
        // 用于命名代码拆分时创建的共享块的输出命名
        chunkFileNames: "js/[name].[hash].js", 
        // 用于输出静态资源的命名，[ext]表示文件扩展名
        assetFileNames: "[ext]/[name].[hash].[ext]", 
      },
    },
  },
});
