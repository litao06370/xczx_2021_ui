//花括号引入方法
var {add2} = require('./module01.js');

var Vue = require('./vue.min.js');
var vm = new Vue({
    el:'#myApp',
    data:{
        name:'haha',
        num1:1,
        num2:2,
        size:100,
        result:0
    },
    methods:{
        add: function () {
            // alert('methods:add()');
            this.result= add2(Number.parseInt(this.num1),Number.parseInt(this.num2));
        }
    }
});