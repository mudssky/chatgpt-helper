import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import monkey, { cdn } from 'vite-plugin-monkey'
import UnoCSS from 'unocss/vite'
import packageJson from './package.json' //--resolveJsonModule
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    UnoCSS({
      /* options */
    }),
    monkey({
      entry: 'src/main.ts',
      userscript: {
        icon: 'https://chat.openai.com/favicon-32x32.png',
        namespace: packageJson.homepage,
        description: packageJson.description,
        match: ['https://chat.openai.com/*'],
        author: packageJson.author,
        version: packageJson.version,
        license: packageJson.license,
        updateURL:
          'https://github.com/mudssky/chatgpt-helper/blob/main/dist/chatgpt-helper.user.js',
        'run-at': 'document-body',
      },
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
        },
      },
    }),
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      mangle: {
        reserved: ['GM_download'],
      },
    },
  },
})
