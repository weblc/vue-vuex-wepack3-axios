const getters = {
    user: state => state.user.userName,
    roles: state => state.user.roles,
    addRouters: state => state.permission.addRouters,
    routers: state => state.permission.routers,
    sidebar: state => state.app.sidebar,
    tags: state => state.app.tags
};
export default getters;
