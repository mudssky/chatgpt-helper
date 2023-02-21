import { createApp } from 'vue'
import App from './App.vue'
import 'uno.css'

console.log('hello world')
const appid = 'chat-app-helper'
function mountApp() {
  createApp(App).mount(
    (() => {
      const app = document.createElement('div')

      console.log('mount app')
      app.id = appid
      // const buttonContainer = document.querySelector('.w-full.flex-shrink-0')!
      document.body.append(app)
      // document.body.append(app);
      return app
    })(),
  )
}

export const observer = new MutationObserver((mutationsList) => {
  // 遍历每个 MutationRecord 对象
  for (let mutation of mutationsList) {
    // 检查 mutation 类型是否为子节点变化
    if (mutation.type === 'childList') {
      // 在此处执行你的操作
      if (!document.getElementById(appid)) {
        mountApp()
      }
    }
  }
})

// 配置 MutationObserver
export const config = {
  attributes: true, //观察目标属性的改变
  childList: true, //观察目标子节点的变化，比如添加或者删除目标子节点，不包括修改子节点以及子节点后代的变化
  subtree: true, // 目标以及目标的后代改变都会观察
  characterData: true, //观察目标数据的改变(改变前的数据/值)
}
// const buttonContainer =
//   document.querySelector('.relative>.flex.ml-1') ?? document.body
// const buttonContainer = document.querySelector('.w-full.flex-shrink-0')!
// const targetNode = buttonContainer
// observer.observe(targetNode, config)
setTimeout(() => {
  mountApp()
}, 1000)
