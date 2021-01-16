var add4 = function add3(a,b) {
    return a+b;
};

//导出后,其他文件引用 add2
module.exports.add2 = add4;
/*module.exports = {add4};
* 使用此方式,则其他文件引用 add4,
* 花括号中可添加多个需导出的方法
* {add1,add2,add3,...}
* */
