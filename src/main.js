import Vue from 'vue'
import App from './App'
import router from './router'
import '../src/vantUi'
import 'reset-css'
import axios from 'axios'


Vue.filter("RMBformat", val => {
    return "￥" + parseFloat(val).toFixed(2) + "元"
})

//配置全局守卫，更改title
router.beforeEach((to, form, next) => {
    let token = localStorage.getItem("token");
    if (to.path == "/Car") {
        if (token) {
            next()
        } else {
            //表示没有登陆
            Vue.prototype.$toast("请先登录");
            setTimeout(() => {
                next("/user")
            }, 1000);
        }
        return
    }
    next();
    if (to.meta.title) {
        document.title = to.meta.title
    } else {
        document.title = '默认标题' //此处写默认的title
    }

})


Vue.prototype.$http = axios;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})