/**
 * Created by cui on 2017/7/6.
 */
import Vue from 'vue';
import App from './App.vue';
import vueRouter from 'vue-router';
import router from './router/routers';
import ElementUI from 'element-ui';
import store from 'src/store/index';
import Nprogress from 'nprogress';//Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条样式
import IconSvg from '@components/Icon-svg/index.vue';//阿里图标组件
import echarts from 'echarts';
import { getToken } from '@utils/auth';
// 导入样式文件
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// import './css/test.css';
Vue.use(vueRouter);
Vue.prototype.$echarts = echarts;
const whiteList = ['/login'];// 不重定向白名单
router.beforeEach((to,from,next) => {
    Nprogress.start(); // 开启Progress
    if (getToken()) {
        if (to.path === '/login') {
            next({ path: '/' });
            Nprogress.done();
        } else {
            if (store.getters.roles.length === 0) {
                store.dispatch('GetInfo').then(res => {
                    const roles = res.data.roles;
                    store.dispatch('GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
                        router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
                        next({ ...to }); // hack方法 确保addRoutes已完成
                    });
                });
            } else {
                next();
                Nprogress.done();
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) { //如果是登录页面路径，就直接next()
            next();
        } else { //不然就跳转到登录；
            next('/login');
            Nprogress.done();
        }
    }
});
router.afterEach(() => {
    Nprogress.done(); // 结束Progress
});

/* eslint-disable no-new */
Vue.component('icon-svg', IconSvg);
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {
        App
    }
});

if (module.hot) {
    module.hot.accept();
}