// import request from '../request/request'
import request from '@/request/request'


//首页数据
export function getData() {
    return request({
        url: '/index/index',
        method: 'get'
    })
}

//搜索弹出框数据
export function getSeachData() {
    return request({
        url: '/search/index',
        method: 'get'
    })
}

//搜索实时数据显示
export function getSeachList(data) {
    return request({
        url: '/search/helper',
        method: 'get',
        params: data
    })
}

//商品分类数据
export function getProjectData(data) {
    return request({
        url: '/goods/list',
        method: 'get',
        params: data
    })
}

//删除数据
export function deleteData() {
    return request({
        url: '/search/clearhistory',
        method: 'post',
    })
}


//用户登录数据
export function LoginData(data) {
    return request({
        url: '/auth/loginByWeb',
        method: 'post',
        data
    })
}


//商品详情页数据
export function ProjectDatas(data) {
    return request({
        url: '/goods/detail',
        method: 'get',
        params: data
    })
}

// 相关产品
export function RelatedDatas(data) {
    return request({
        url: '/goods/related',
        method: 'get',
        params: data
    })
}

// 获取购物车产品数量
export function GoodscountDatas() {
    return request({
        url: '/cart/goodscount',
        method: 'get',
    })
}

//加入购物车数据
export function AddProductToCart(data) {
    return request({
        url: '/cart/add',
        method: 'post',
        data
    })
}

// 获取购物车数据
export function GetCartListData() {
    return request({
        url: '/cart/index',
        method: 'get',
    })
}


//点击切换商品选中状态
export function ChangeGoodChecked(data) {
    return request({
        url: '/cart/checked',
        method: 'post',
        data
    })
}


//商品步进器
export function StepperChangeData(data) {
    return request({
        url: '/cart/update',
        method: 'post',
        data
    })
}

//删除商品
export function DeleteGood(data) {
    return request({
        url: '/cart/delete',
        method: 'post',
        data
    })
}


// 品牌详情
export function DetailDatas(data) {
    return request({
        url: '/brand/detail',
        method: 'get',
        params: data
    })
}


// 商品分类数据
export function ChannelDatas(data) {
    return request({
        url: '/goods/category',
        method: 'get',
        params: data
    })
}


// 专题数据
export function TopicListDatas(data) {
    return request({
        url: '/topic/list',
        method: 'get',
        params: data
    })
}


//6. 分类页 Category
// 全部分类数据接口
export function GetChannelDataApi() {
    return request({
        url: '/catalog/index',
        method: 'get',

    })
}
// 获取当前分类数据
export function GetFenleiDataApi(data) {
    return request({
        url: '/catalog/current',
        method: 'get',
        params: data
    })
}




export default {
    getData,
    getSeachData,
    getSeachList,
    getProjectData,
    deleteData,
    LoginData,
    ProjectDatas,
    RelatedDatas,
    GoodscountDatas,
    AddProductToCart,
    GetCartListData,
    ChangeGoodChecked,
    StepperChangeData,
    DeleteGood,
    DetailDatas,
    ChannelDatas,
    TopicListDatas,
    GetChannelDataApi,
    GetFenleiDataApi
}