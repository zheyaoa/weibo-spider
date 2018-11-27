//将获取的html 转化为 需要的
const cheerio = require('cheerio');
function txtReplace(txt){
    return txt.replace(/undefined/g,'');
}

function htmlParser(html){
    const $ = cheerio.load(html);
    const contentList = $('#pl_feedlist_index .card-wrap .txt');
for(index in contentList){
    if(!Number.isNaN(Number(index))){
        let childs = contentList[index].children;
        let txt = '';
        childs.forEach(child => {
            txt += child.data;
        })
        console.log(txtReplace(txt));
    }
}
}

module.exports = htmlParser;