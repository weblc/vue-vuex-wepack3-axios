import {ordinarySourceMap,asynSourceMap} from 'src/router/routers';
import {deepClone} from 'src/utils';

/**
 * 检测是否含有超级管理员权限
 */
function hasSuperPermis (role) {
    return role === 'superAdmin';
}
/**
 * 判断 roles中是否匹配route.meta里面的role权限
 * @param  roles
 * @param  route
 */
function hasPermiss (route,roles) {
    // let rolesArr = deepClone(roles);
    // console.log(rolesArr);
    if (route.meta && route.meta.role) {
        return roles.some(role => route.meta.role.indexOf(role) >= 0);
    } else {
        return true;
    }
}
/**
 * 过滤路由
 * @param  routers
 * @param roles
 */
function filterAsyncRouter (routers,roles) {
    const accessedRouters = routers.filter(route => {
        if (hasPermiss(route,roles)) {
            if (route.children && route.children.length) {
                filterAsyncRouter(route.children,roles);
            }
            return true;
        } else {
            return false;
        }
    });
    return accessedRouters;
}
const permission = {
    state: {
        routers: ordinarySourceMap,
        addRouters: []
    },
    mutations: {
        SET_ROUTERS: (state,routers) => {
            state.addRouters = deepClone(routers);
            state.routers = deepClone(ordinarySourceMap.concat(routers));
        }
    },
    actions: {
        GenerateRoutes ({commit},data) {
            return new Promise(resolve => {
                const {roles} = data;
                let accessedRouters;
                if (roles.some(hasSuperPermis)) {
                    accessedRouters = asynSourceMap;
                } else {
                    accessedRouters = filterAsyncRouter(asynSourceMap, roles);
                }
                console.log(accessedRouters);
                commit('SET_ROUTERS', accessedRouters);
                resolve();
            });
        }
    }
};

export default permission;