<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import html2canvas from 'html2canvas'
import { GM_cookie, unsafeWindow, monkeyWindow, GM_addElement, GM_download } from '$';
// function downloadFile(dataurl: string, filename: string) {
//   const a = document.createElement('a')
//   a.style.display = 'none'
//   a.href = dataurl
//   a.download = filename
//   document.body.appendChild(a)
//   a.click()
//   document.body.removeChild(a)
// }


function handleScreenshot() {
  const contentDom = document.querySelectorAll('[class*=react-scroll-to-bottom--css]>.flex.flex-col')[0] ?? document.body
  html2canvas(contentDom as HTMLElement).then(async (canvas) => {

    // console.log({ canvas, url: canvas.toDataURL("image/png"), contentDom })
    canvas.toBlob(function (blob: any) {
      const picName = `${(document.querySelectorAll('.dark .overflow-y-auto a.bg-gray-800')[0] as HTMLElement)?.innerText ?? 'snapshot'}.png`
      GM_download({
        url: URL.createObjectURL(blob),
        name: picName,
        onload() {
          console.log('下载图片,', picName)
        },
      });
    })
  })
}
</script>

<template>
  <div class="fixed right-0 bottom-[200px]">
    <button @click="handleScreenshot" class="btn flex justify-center gap-2 btn-neutral border-0 md:border">截图</button>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
