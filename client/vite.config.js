import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import {VantResolver} from 'unplugin-vue-components/resolvers';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Components({
            resolvers: [VantResolver()],
        }),
    ],
    server: {
        proxy: { //配置跨域
            '/be': {
                target: 'http://127.0.0.1:3030/', //这里后台的地址模拟的;应该填写你们真实的后台接口
                changOrigin: true, //允许跨域
                rewrite: (path) => path.replace(/^\/be/, '')
            },
        },
        cors: true
    }
})
