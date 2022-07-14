const { URL } = require('url');
const axios = require('axios');
const main = async ctx => {
    const path = ctx.request.body.path;
    const gacha_type = ctx.request.body.gacha_type;
    console.log(path)
    const url = new URL(path);

    const sourceSearchParams = url.searchParams;

    const logApi = 'https://hk4e-api.mihoyo.com/event/gacha_info/api/getGachaLog';

    const list = [];
    const getLogList = async ({gacha_type,page,size = 20,end_id}) => {
        const logUrl = new URL(logApi);
        sourceSearchParams.set('gacha_type', gacha_type);
        sourceSearchParams.set('page', page);
        sourceSearchParams.set('size', size);
        sourceSearchParams.set('end_id', end_id);
        logUrl.search = sourceSearchParams.toString();
        const getLogUrl = logUrl.toString();
        console.log('fetch: ' + getLogUrl);
        const res = (await axios.get(getLogUrl)).data;

        // 是否成功返回
        if (res.retcode === 0){
            return res.data.list;
        }
        // 返回请求过快
        else if (res.retcode === -110){
            return await getLogList({gacha_type,page,size,end_id});
        }
        else if(res.retcode === -101 || res.message === 'authkey timeout'){
            res.message = '日志链接已过期（authkey过期）'
            return Promise.reject(res)
        }

        // {"data":null,"message":"authkey timeout","retcode":-101}
        else {
            return [];
        }

    }

    try {
        let end_id = 0;
        let page = 1;
        // let gacha_type = 301;
        const size = 20;
        let current = [];
        do {
            current = await getLogList({gacha_type,page,size,end_id});
            list.push(...current);
            if(current.length > 0){
                end_id = current[current.length - 1].id;
            }
            page ++;
        }while (!(current.length - 2 <= 0))

        // 分析
        // 一共多少抽
        const total =  list.length;
        // 哪些五星在第几抽
        const hitList = []
        let flag = 0; // 记录上一次命中
        for (let i = list.length - 1, index = 1; i >= 0; i--, index ++) {
            const row = list[i];
            if (row.rank_type === '5'){
                row.index =  index;
                row.cost =  index - flag;
                hitList.push(row);
                flag = index;
            }
        }
        // 垫了多少抽
        const bedding = total - flag; //总数 - 上一次命中

        ctx.response.type = 'JSON'
        ctx.response.body = {
            total, // 抽卡数
            gacha_type, // 祈愿类型
            hitList, // 命中五星的列表 包含花了几抽和第几抽
            bedding, // 已垫多少抽
        };
    }catch (e) {
        console.log(e)
        ctx.response.type = 'JSON'
        ctx.response.status = 401
        ctx.response.body = e
    }

};

module.exports = main
