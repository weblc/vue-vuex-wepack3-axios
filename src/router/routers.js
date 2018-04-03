/**
 * Created by cui on 2017/7/10.
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import {proImport,devImport} from 'src/router';
Vue.use(VueRouter);
let _import = null;
process.env.NODE_ENV === 'development' ? _import = devImport : _import = proImport;

// v1 开发环境中频繁打包
// const home = () => import(
//     /* webpackChunkName: "home" */
//     '@views/home/index.vue');
// const login = () => import('@views/login/index.vue');
// const test1 = () => import('@views/test1/test1.vue');
// const playIndex = () => import('@views/playIndex/index');
// const singleMenu = () => import('@views/singleMenu/index');
/**
 * 普通路由
 */
export const ordinarySourceMap = [

    {
        path: '/',
        component: _import('home/index') ,
        redirect: 'playerIndex',
        name: '首页',
        noDropdown: true,
        hidden: true,
        children: [
            {path: 'playerIndex',component: _import('playIndex/index'),name: '首页'}
        ]

    },
    {
        path: '/login',
        name: 'Login',
        component: _import('login/index'),
        hidden: true
    }
    // { path: '/error', component: error, hidden: true },
];

export default new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes: ordinarySourceMap
});

export const asynSourceMap = [
    {
        path: '/muiscPlay',
        component: _import('home/index') ,
        noDropdown: true,
        redirect: '/muiscPlay/index',
        meta: { role: ['admin'] },
        icon: 'icon-yinle',
        children: [
            {path: 'index',component: _import('muiscPlay/index'),name: 'music'}
        ]
    },
    {
        path: '/test',
        component: _import('home/index') ,
        noDropdown: true,
        redirect: '/test/playerIndex',
        meta: { role: ['admin'] },
        icon: 'icon-zujianku',
        children: [
            {path: 'playerIndex',component: _import('test1/test1'),name: '组件'}
        ]
    },
    {
        path: '/table',
        component: _import('home/index') ,
        name: '图表',
        redirect: 'noredirect',
        meta: { role: ['guest'] },
        noDropdown: false,
        hidden: false,
        icon: 'icon-chart',
        children: [
            { path: '/table/index',
                component: _import('test1/test1'),
                name: '图标1',
                meta: { role: ['admin'] },
                noDropdown: false,
                redirect: '/table/index/index1',
                hidden: false,
                children: [
                    { path: 'index1', component: _import('test1/test1'), name: '图表11', meta: { role: ['guest'] } },
                    { path: 'index2', component: _import('test1/test1'), name: '图表12', meta: { role: ['guest'] } },
                    { path: 'index3', component: _import('test1/test1'), name: '图表13', meta: { role: ['guest'] } }
                ]},
            { path: 'index', component: _import('test1/test1'), name: '图表2', meta: { role: ['guest'] } }
        ]

    },

    { path: '*', redirect: '/404', hidden: true }
];