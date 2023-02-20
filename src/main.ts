import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import 'uno.css'

import 'tippy.js/dist/tippy.css' // optional for styling

console.log('hello world')
const appid = 'chat-app-helper'
function mountButtons() {
  setTimeout(() => {
    createApp(App).mount(
      (() => {
        const app = document.createElement('div')

        app.id = appid
        // const buttonContainer = document.querySelector('.w-full.flex-shrink-0')!
        document.body.append(app)
        // document.body.append(app);
        return app
      })(),
    )
  }, 1000)
}

const observer = new MutationObserver((mutationsList) => {
  // 遍历每个 MutationRecord 对象
  for (let mutation of mutationsList) {
    // 检查 mutation 类型是否为子节点变化
    if (mutation.type === 'childList') {
      // 在此处执行你的操作
      if (!document.getElementById(appid)) {
        mountButtons()
      }
    }
  }
})

// 配置 MutationObserver
const config = {
  attributes: true,
  childList: true,
  subtree: true,
  characterData: true,
}
// const buttonContainer =
//   document.querySelector('.relative>.flex.ml-1') ?? document.body
const buttonContainer = document.querySelector('.w-full.flex-shrink-0')!
const targetNode = buttonContainer
observer.observe(targetNode, config)
setTimeout(() => {
  mountButtons()
}, 1000)
