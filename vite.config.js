import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from "path";
import qiankun from 'vite-plugin-qiankun'

// useDevMode 开启时与热更新插件冲突
const useDevMode = true // 如果是在主应用中加载子应用vite,必须打开这个,否则vite加载不成功, 单独运行没影响

export default defineConfig(({ mode }) => {
  const root = process.cwd() //  process.cwd()返回当前工作目录
  const env = loadEnv(mode, root)

  let config = {
    // base: env.VITE_BASE_API,
    plugins: [
    vue(),
    qiankun('subapp', { useDevMode })
  ],
    // resolve: {
    //   alias: {
    //     "@": path.resolve(__dirname, "src"),
    //   },
    // },
    // server: {
    //   host: 'x.x.x.x', // 暴露内网ip
    //   port: 8000,
    //   cors: true,
    //   origin: mode === 'development' ? env.VITE_ORIGIN_DEV : env.VITE_BASE_API
    // },
    output: {
      // 把子应用打包成 umd 库格式
      library: `subapp-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_subapp`
    },
  }
  return config
})
