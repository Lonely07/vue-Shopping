import Vue from 'vue'
import Router from 'vue-router'

//处理重复点击报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
    routes: [{
            path: "/",
            redirect: "/home"
        },
        {
            path: '/home',
            name: 'home',
            meta: {
                title: '首页',
                activeNum: 0,
                isShowTabbar: true
            },
            component: () =>
                import ('../view/home'),
            children: [{
                path: '/home/seachpopu',
                name: 'seachpopu',
                component: () =>
                    import ('../view/seachpopu')
            }]
        },
        {
            path: '/topic',
            name: 'Topic',
            meta: {
                title: "专题",
                activeNum: 1,
                isShowTabbar: true
            },
            component: () =>
                import ('../view/Topic'),
        },
        {
            path: '/category',
            name: 'Category',
            meta: {
                title: "分类",
                activeNum: 2,
                isShowTabbar: true
            },
            component: () =>
                import ('../view/Category'),
        },
        {
            path: '/car',
            name: 'Car',
            meta: {
                title: "购物车",
                activeNum: 3,
                isShowTabbar: true
            },
            component: () =>
                import ('../view/Car'),
        },
        {
            path: '/user',
            name: 'User',
            meta: {
                title: "我的",
                activeNum: 4,
                isShowTabbar: true
            },
            component: () =>
                import ('../view/User'),
        },
        {
            path: '/ProjectDatas',
            name: 'ProjectDatas',
            meta: {

            },
            component: () =>
                import ('../view/ProjectDatas'),
        },
        {
            path: '/BrandDetail',
            name: 'BrandDetail',
            meta: {
                title: '产品制造商介绍'
            },
            component: () =>
                import ('../view/BrandDetail'),
        },
        {
            path: '/Channel',
            name: 'Channel',
            meta: {
                title: '商品分类'
            },
            component: () =>
                import ('../view/Channel'),
        },

    ],
    mode: 'history',
})