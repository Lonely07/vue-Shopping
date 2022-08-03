import axios from 'axios';

const service = axios.create({
    // baseURL: 'http://kumanxuan1.f3322.net:8001/', // url = base api url + request url
    baseURL: '/api',
    timeout: 5000 // request timeout
})

// request拦截器 request interceptor
service.interceptors.request.use(
    config => {
        // 不传递默认开启loading
        //  if (!config.hideloading) {
        //  //   // loading
        // Toast.loading({
        //     forbidClick: true
        //    })
        //   }
        // if (Cookies.get('Token')) {
        // 	config.headers['Authorization'] = 'Bearer ' + Cookies.get('Token')
        // 	config.headers['Content-Type'] = 'application/json'
        // }
        let token = localStorage.getItem("token");
        if (token) {
            // 携带登录凭证发起请求
            config.headers["X-Nideshop-Token"] = token
        }
        return config
    },
    error => {
        // do something with request error
        // console.log(error) // for debug
        return Promise.reject(error)
    }
)

// respone拦截器
service.interceptors.response.use(
    res => {
        // Toast.clear()
        // const res = response.data
        // if (res.status && res.status !== 200) {
        // 	// 登录超时,重新登录
        // 	if (res.status == '401') {
        // 		router.push({path:"/login"})
        // 		Cookies.set('Token', "", -1);
        // 		sessionStorage.clear();
        // 	}
        // 	if(res.msg!="非法访问"){

        // 		Toast.fail(res.msg)
        // 	}
        // 	if(res.status == '500'){
        // 		router.push({name:'NullPage', params:{msg: res.msg}})
        // 	}
        // 	return Promise.reject(res || 'error')
        // } else {
        // 	return Promise.resolve(res)
        // }
        return Promise.resolve(res.data)
    },
    error => {
        // Toast.clear()
        // console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)

export default service