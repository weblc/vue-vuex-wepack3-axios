import { getMusic } from '@api/muiscPlay';

var app = {
    state: {
        sidebar: {
            opened: false
        },
        tags: []
    },
    mutations: {
        TOGGLE_SIDEBAR: state => {
            state.sidebar.opened = !state.sidebar.opened;
        },
        ADD_TAGS: (state,view) => {
            if (state.tags.some(v => v.path === view.path)) return false;
            state.tags.push({name: view.name,path: view.path});
        },
        DELE_TAG: (state,view) => {
            let index;
            for (let [i,elem] of state.tags.entries()) {
                if (elem.path === view.path) {
                    index = i;
                    break;
                }
            }
            state.tags.splice(index, 1);
        }
    },
    actions: {
        ToggleSideBar ({commit}) {
            commit('TOGGLE_SIDEBAR');
        },
        addTags ({commit},view) {
            commit('ADD_TAGS',view);
        },
        deleTag ({commit,state},view) {
            return new Promise(resolve => {
                commit('DELE_TAG',view);
                resolve([...state.tags]);
            });
        },
        getMusic ({commit}) {
            return new Promise((resolve,reject) => {
                getMusic().then(response => {
                    resolve(response.data);
                }).catch(error => {
                    reject(error);
                });
            });
        }
    }

};

export default app;