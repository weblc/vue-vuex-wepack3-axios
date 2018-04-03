export function proImport (file) {
    console.log('这是生产环境回调函数懒加载');
    return () => import('@views/' + file + '.vue');
};
export function devImport (file) {
    console.log('这是开发环境');
    // return () => import('@views/' + file + '.vue');
    return require('@views/' + file + '.vue').default;
}