import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import {VantResolver} from 'unplugin-vue-components/resolvers';
// https://vitejs.dev/config/
export default defineConfig({
    base: 'analysis',
    build: {
        outDir: '../../static/analysis'
    },
    plugins: [
        vue(),
        Components({
            resolvers: [VantResolver()],
        }),
    ],
    server: {
        host: true,
        proxy: { //配置跨域
            '/home': {
                target: 'http://192.168.0.102:3030/', //这里后台的地址模拟的;应该填写你们真实的后台接口
                changOrigin: true, //允许跨域
                // rewrite: (path) => path.replace(/^\/be/, '')
            },
            '/images': {
                target: 'http://192.168.0.102:3030/', //这里后台的地址模拟的;应该填写你们真实的后台接口
                changOrigin: true, //允许跨域
                // rewrite: (path) => path.replace(/^\/be/, '')
            },
            '/icon': {
                target: 'http://192.168.0.102:3030/', //这里后台的地址模拟的;应该填写你们真实的后台接口
                changOrigin: true, //允许跨域
                // rewrite: (path) => path.replace(/^\/be/, '')
            },
        },
        cors: true
    }
})
