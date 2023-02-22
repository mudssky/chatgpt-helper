<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import html2canvas from 'html2canvas'
import { GM_download, } from '$';
import TurndownService from 'turndown'
import { turndownPluginGfm } from './vendor/turndown-plugin-gfm'
// function downloadFile(dataurl: string, filename: string) {
//   const a = document.createElement('a')
//   a.style.display = 'none'
//   a.href = dataurl
//   a.download = filename
//   document.body.appendChild(a)
//   a.click()
//   document.body.removeChild(a)
// }
function getTurnDownService() {
  const hljsREG = /^.*(hljs).*(language-[a-z0-9]+).*$/i;

  const gfm = (turndownPluginGfm).gfm
  //@ts-ignore
  const turndownService = new TurndownService({
    hr: '---'
  }).use(gfm)
    .addRule('code', {
      //@ts-ignore
      filter: (node) => {
        if (node.nodeName === 'CODE' && hljsREG.test(node.classList.value)) {
          return 'code';
        }
      },
      //@ts-ignore
      replacement: (content, node) => {
        // @ts-ignore
        const classStr = node.getAttribute('class');
        if (hljsREG.test(classStr)) {
          const lang = classStr.match(/.*language-(\w+)/)[1];
          if (lang) {
            return `\`\`\`${lang}\n${content}\n\`\`\``;
          }
          return `\`\`\`\n${content}\n\`\`\``;
        }
      }
    })
    .addRule('ignore', {
      filter: ['button', 'img'],
      replacement: () => '',
    })
    .addRule('table', {
      filter: 'table',
      replacement: function (content, node) {
        return `\`\`\`${content}\n\`\`\``;
      },
    });


  return turndownService;
}
function getFileName() {
  return (document.querySelectorAll('.dark .overflow-y-auto a.bg-gray-800')[0] as HTMLElement)?.innerText ?? 'snapshot'
}
function handleScreenshot() {
  const contentDom = document.querySelectorAll('[class*=react-scroll-to-bottom--css]>.flex.flex-col')[0] ?? document.body
  html2canvas(contentDom as HTMLElement).then(async (canvas) => {
    // console.log({ canvas, url: canvas.toDataURL("image/png"), contentDom })
    canvas.toBlob(function (blob: any) {
      const picName = getFileName() + '.png'
      GM_download({
        url: URL.createObjectURL(blob),
        name: picName,
        onload() {
          console.log('下载图片,', picName)
        },
        onerror(e) {
          console.log('下载失败', e)
        }
      });
    })
  })
}
function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.download = fileName ?? 'file';
  link.href = url;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link)
}
function handleCopyMarkdown() {
  const content = Array.from(document.querySelectorAll('main .items-center>div')).map((i: any) => {
    let j: any = i.cloneNode(true);
    if (/dark\:bg-gray-800/.test((i as any).getAttribute('class'))) {
      j.innerHTML = `<h2>${i.innerText}</h2>`;
    }
    // console.log(j.innerHTML)
    return j.innerHTML;
  }).join('<br />');
  const turndownService = getTurnDownService()


  const markdown = turndownService.turndown(content)

  const fileName = getFileName() + '.md'

  // const
  const blob = new Blob([markdown], { type: 'text/markdown' })
  console.log({ fileName, markdown, blob })
  downloadBlob(blob, fileName)
  // GM_download 不支持markdown后缀的文件
  // GM_download({
  //   url: URL.createObjectURL(blob),
  //   name: fileName,
  //   onload() {
  //     console.log('下载markdown,', fileName)
  //   },
  //   onerror(e) {
  //     console.log('下载失败', e)
  //   }
  // });

}
</script>

<template>
  <div
    class="fixed right-0 bottom-[50%] w-[200px] transition-all translate-x-[180px] hover:translate-x-[0px]  h-[200px] bg-gray-300 p-[20px] rounded space-y-[10px]">
    <button @click="handleScreenshot"
      class="btn flex justify-center gap-2 btn-neutral border-0 md:border">screenshot</button>
    <button @click="handleCopyMarkdown" class="btn flex justify-center gap-2 btn-neutral border-0 md:border">export
      markdown</button>
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
