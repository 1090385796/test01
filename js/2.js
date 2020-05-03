// 返回请求的目标页码【参数：要请求的目标页码，当前页码】
function handlePage(destPage, currPage) {
    if (destPage === 'pre') {
        currPage--;
    } else if (destPage === 'next') {
        currPage++;
    } else {
        currPage = destPage || 1;
    }
    return currPage;
}
// 构建翻页组件【参数：当前页码，总页数，向后端请求数据要调用的方法名称】
function buildPagination(currPage, totalPage, funcName) {
    let pageStr = '';
    if (totalPage > 1) {
        if (totalPage <= 5) {
            pageStr += prePage(currPage, funcName);
            pageStr += startNPage(currPage, totalPage, funcName);
            pageStr += nextPage(currPage, totalPage, funcName);
        } else if (totalPage > 5) {
            if (currPage < 5) {
                pageStr += prePage(currPage, funcName);
                pageStr += startNPage(currPage, totalPage, funcName);
                pageStr += lastPage(totalPage, funcName);
                pageStr += nextPage(currPage, totalPage, funcName);
            } else {
                if (currPage <= (totalPage - 5)) {
                    pageStr += prePage(currPage, funcName);
                    pageStr += firstPage(funcName);
                    pageStr += plusAndMinusTwoPages(currPage, funcName);
                    pageStr += lastPage(totalPage, funcName);
                    pageStr += nextPage(currPage, totalPage, funcName);
                } else {
                    pageStr += prePage(currPage, funcName);
                    pageStr += firstPage(funcName);
                    pageStr += endNPage(currPage, totalPage, funcName);
                    pageStr += nextPage(currPage, totalPage, funcName);
                }
            }
        }
    } else {
        pageStr += initPage();
    }
    return pageStr;
}
// 初始状态
function initPage() {
    return '<li class="page-item disabled"><a class="page-link" href="javascript: void(0);">上一页</a></li>' +
        '<li class="page-item disabled"><a class="page-link" href="javascript: void(0);">1</a></li>' +
        '<li class="page-item disabled"><a class="page-link" href="javascript: void(0);">下一页</a></li>';
}
// 上一页
function prePage(currPage, funcName) {
    let str = '';
    if (currPage === 1) {
        str += '<li class="page-item disabled"><a class="page-link" href="javascript: void(0);">上一页</a></li>';
    } else {
        str += '<li class="page-item"><a class="page-link" href="javascript: ' + funcName + '(\'pre\');">上一页</a></li>';
    }
    return str;
}
// 固定首页
function firstPage(funcName) {
    return '<li class="page-item"><a class="page-link" href="javascript: ' + funcName + '(1);">1</a></li>' +
        '<li class="page-item disabled"><a class="page-link" href="javascript: void(0);">...</a></li>';
}
// 开头的连续 n 页【注意判断总页数是否大于5】
function startNPage(currPage, totalPage, funcName) {
    let str = '', total;
    if (totalPage > 5) {
        total = 5;
    } else {
        total = totalPage;
    }
    for (let i = 1; i < total + 1; i++) {
        if (i === currPage) {
            str += '<li class="page-item disabled"><a class="page-link" href="javascript: void(0);">' + i + '</a></li>';
        } else {
            str += '<li class="page-item"><a class="page-link" href="javascript: ' + funcName + '(' + i + ');">' + i + '</a></li>';
        }
    }
    return str;
}
// 前后正负 2 页
function plusAndMinusTwoPages(currPage, funcName) {
    let str = '', start = currPage - 2, end = currPage + 3;
    for (let i = start; i < end; i++) {
        if (i === currPage) {
            str += '<li class="page-item disabled"><a class="page-link" href="javascript: void(0);">' + i + '</a></li>';
        } else {
            str += '<li class="page-item"><a class="page-link" href="javascript: ' + funcName + '(' + i + ');">' + i + '</a></li>';
        }
    }
    return str;
}
// 末尾的连续 n 页
function endNPage(currPage, totalPage, funcName) {
    let str = '', start = totalPage - 5 + 1, end = totalPage + 1;
    for (let i = start; i < end; i++) {
        if (i === currPage) {
            str += '<li class="page-item disabled"><a class="page-link" href="javascript: void(0);">' + i + '</a></li>';
        } else {
            str += '<li class="page-item"><a class="page-link" href="javascript: ' + funcName + '(' + i + ');">' + i + '</a></li>';
        }
    }
    return str;
}
// 固定末页
function lastPage(totalPage, funcName) {
    return '<li class="page-item disabled"><a class="page-link" href="javascript: void(0);">...</a></li>' +
        '<li class="page-item"><a class="page-link" href="javascript: ' + funcName + '(' + totalPage + ');">' + totalPage + '</a></li>';
}
// 下一页
function nextPage(currPage, totalPage, funcName) {
    let str = '';
    if (currPage === totalPage) {
        str += '<li class="page-item disabled"><a class="page-link" href="javascript: void(0);">下一页</a></li>';
    } else {
        str += '<li class="page-item"><a class="page-link" href="javascript: ' + funcName + '(\'next\');">下一页</a></li>';
    }
    return str;
}