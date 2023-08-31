import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './router'
import {
  renderWithQiankun,
  qiankunWindow
} from 'vite-plugin-qiankun/dist/helper'

let router = null
let instance = null
let history = null

// declare global {
//   interface Window {
//     __POWERED_BY_QIANKUN__: any
//     __INJECTED_PUBLIC_PATH_BY_QIANKUN__: any
//   }
// }
// window.__POWERED_BY_QIANKUN__ = null
// window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__

function render(props = {}) {
  const { container } = props
  history = createWebHashHistory()
  router = createRouter({
    history,
    routes
  })
  instance = createApp(App)
  instance.use(router)
  //   instance.use(store);
  instance.mount(
    container ? container.querySelector('#app1') : document.getElementById('app1')
  )
  if (qiankunWindow.__POWERED_BY_QIANKUN__) {
    console.log('我正在作为子应用运行')
  }
}

// some code
renderWithQiankun({
  mount(props) {
    console.log('viteapp mount')
    render(props)
  },
  bootstrap() {
    console.log('bootstrap')
  },
  unmount(props) {
    console.log('vite被卸载了')
    instance.unmount()
    instance._container.innerHTML = ''
    history.destroy() // 不卸载  router 会导致其他应用路由失败
    router = null
    instance = null
  }
})

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({})
}
