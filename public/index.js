const fs = require('fs');
const path = require('path');
const request = require('request');
const htmlParser = require('./htmlParser');
const cookie = fs.readFileSync(path.resolve(__dirname,'cookie.txt'));

const main = (keyword) => {
    let code = encodeURIComponent(keyword)
    let url = `https://s.weibo.com/weibo/${code}?q=${code}&typeall=1&suball=1&timescope=custom:2018-11-01-0:2018-11-07-22&Refer=g&page=2`;
    let data = fetchHtml(url);
    data.then((chunk) => {
        htmlParser(chunk)
    })
}

//根据url抓取html页面
const fetchHtml = (url) => {
    const maxPage = 50; //最大搜索页码
    let sPage = 1;  //目前搜索页码
    let headers = {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        "Accept-Encoding":"gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
        "Cache-Control": "max-age=0",
        "Connection":"keep-alive",
        // "Cookie": cookie,
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
    };
    let options = {
        method: 'GET',
        url: url, 
        headers: headers,
        gzip: true
    }
    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                response.setEncoding('utf-8');
                console.log(response.body)
                resolve(response.body);
            } else {
                console.log(error);
            }
        })
    })
}

//将html 解析获取需要的数据 






let argvs = process.argv;
let keyword = argvs[2];
main('十一')