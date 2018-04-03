import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import user from './modules/user';
import permission from './modules/permission';
import app from './modules/app';
Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        user,
        permission,
        app
    },
    getters
});

export default store;