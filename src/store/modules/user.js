import { loginCheck, getInfo } from '@api/login';
import { getToken, setToken } from '@utils/auth';
const user = {
    state: {
        userName: 'xiaisdna',
        num: 1,
        setting: {
            articlePlatform: []
        },
        name: '',
        token: getToken(),
        roles: ''
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        },
        SET_NAME: (state, name) => {
            state.name = name;
        }
    },
    actions: {
        /**
         * @param {*} commit  state对象
         * @param {*} userInfo 用户信息
         */
        LoginCheck ({ commit }, userInfo) {
            const user = userInfo.user.trim();
            return new Promise((resolve, reject) => {
                loginCheck(user, userInfo.pass).then(response => {
                    const data = response.data;
                    setToken(data.token);
                    commit('SET_TOKEN',data.token);
                    resolve();
                }).catch(error => {
                    reject(error);
                });
            });
        },
        GetInfo ({commit,state}) {
            return new Promise((resolve,reject) => {
                getInfo(state.token).then(response => {
                    const data = response.data;
                    commit('SET_ROLES',data.roles);
                    commit('SET_NAME',data.name);
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        }
    }
};
export default user;