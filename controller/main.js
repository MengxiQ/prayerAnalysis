const { URL } = require('url');
const https = require('https');
const axios = require('axios')
const main = async ctx => {
    const path = 'https://webstatic.mihoyo.com/hk4e/event/e20190909gacha/index.html?authkey_ver=1&sign_type=2&auth_appid=webview_gacha&init_type=301&gacha_id=e432d80a79eb2a8953331fe921c7b6dcf25aa808&timestamp=1657693972&lang=zh-cn&device_type=mobile&ext=%7b%22loc%22%3a%7b%22x%22%3a-237.0648193359375%2c%22y%22%3a196.47373962402345%2c%22z%22%3a1046.5203857421875%7d%2c%22platform%22%3a%22Android%22%7d&game_version=CNRELAndroid2.8.0_R8589120_S8529951_D8644052&plat_type=android&region=cn_gf01&authkey=DpRDTmqfecFW%2bTewYxStu8HxwLX%2f0KxwZ66anN5TVsNhyNoi8%2fkI%2bKnx7P1ELEGzxoCP1DFhL%2fh9zdfR2oAFB4oVYxE39rNy%2bGjGx7NyhqPKx7I7qHsaw9IMguSId%2fDATkgOYPZiUogNVuhgWHhKZsqAmBZPjmRuP1582OJqRoS%2bH3ToCTlUXFiqiyaxrIYYsvq41OpDbMoSgJFYzioeQJ5leDOKOLBLwBLPEXt2tcseI86gd9NK7VbyFMOH7%2bPOqDa1l5Nqei4ELoz2KS5a3%2fb0%2bQhlehhyHI3D0Bdi3TmHX8jcb6GfnSC1KjSAzWR7dfJtNJUOkfchQAd4SgRegO9oJYnrHJM4QGroHllu4OukNKAnD2TACfdfNI2uTiMP89wftwVS7vwviz6WHBbQnxAcgMhf2%2bwhJL%2f09XGaHkwbhDMR1iHN2qbpyZxCBKYxA1b0%2fUkiZ5hUGy0Wo1BjanVy%2fofAnCb9d%2bkNiKc5In5AnO7WvY61yaYwye9alFK%2fwy%2bqoHAb3xwvirdtRNKO7H%2fodi3fV%2fZoKzpakkviICNRfSzCwbx2zjfaW3oYd7u5D1MPAYSeWtMFgoP7gG6jJoTAhwdDoqEyQUl8hoScqa6s2r%2f%2bO07s9%2f7KKv11NGN2SmqeAPfnOR35koBdP04AwqO50YRYlGXXzXqpCgm2Fisn%2fq2HWnGOtrQ1XT2Bg84vh2agwjzeneo3uI5r%2fMKoTc%2btg%2btrktL8ANc9czp9cOiXGZVzHkQc6UFo4GorkbuFdeU9cqPeSFEs7dwjM1StX7SFlXQlaoGokOPRCTFwEjErwGYtH3jdNDMOMSLVfcyxGpHNhl016Kr%2fea6EZ2XhGOGMUkkbtilzC6LPPa47AfUAYCieONqaqdjhwJ0d%2fuVZsOKAYeMPIVnDzfrm6NLNFeU0QvbkfU0W8ssGtY3%2fYPTQHPlMxLf33ZlxeLv2SzRZOlFEs%2fWIZpB6smWZdOt92xnKcyJOUpjBXnCK6Sqv6N9Ea19u2tSZEEQoN89bzCd34VbKwZeiorjkWHEYBT7knexQ63PEGMmj0qjBpuRP%2f%2bJOz7cTLLhtJgcdsum5stkhv6VsYW%2b1GOZZrd9Xp4zUvGdBq2xqz6w64xlCfytuQcgBaBNco4%2fgGvCeCxqdOtQyTQCOWlFIpCrz3S%2fT5SU4GJdJOgHzVhvr84oQYgTiwq1wGTAUtjIKttxut6r1iNWFz%2buSqukLfunXldWqJ7UiQerbo1kmZeN6tqF8VxVIO2MzNHazUN7cBJ3FKKevH62%2fWDXHb%2fkWGpi%2bvzRd26G0ApWltrjttYAWTcrLyz5e9moFc9i2rCEj8DeomuCXrDctX%2bwcSjp77vTHfEGcUxo7VA%3d%3d&game_biz=hk4e_cn#/log';
    const url = new URL(path)

    const sourceSearchParams = url.searchParams

    const logApi = 'https://hk4e-api.mihoyo.com/event/gacha_info/api/getGachaLog'

    const list = []
    const getLogList = async ({gacha_type,page,size = 20,end_id}) => {
        const logUrl = new URL(logApi)
        sourceSearchParams.set('gacha_type', gacha_type)
        sourceSearchParams.set('page', page)
        sourceSearchParams.set('size', size)
        sourceSearchParams.set('end_id', end_id)
        logUrl.search = sourceSearchParams.toString()
        const getLogUrl = logUrl.toString()
        const res = await axios.get(getLogUrl)
        console.log(res)
        if (res.data.data){
            return res.data.data.list;
        }else {
            return []
        }

    }
    let end_id = 0
    let page = 1
    const size = 20
    let res = []
    do {
        res = await getLogList({gacha_type: 301,page,size,end_id})
        list.push(...res)
        if(res.length > 0){
            end_id = res[res.length - 1].id
        }
        page ++
    }while (!res.length - 2 <= 0)



    ctx.response.type = 'json';
    ctx.response.body = {
        total: list.length,
        list
    };
};

module.exports = main
