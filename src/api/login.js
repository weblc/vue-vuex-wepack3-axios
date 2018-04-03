import ajax from '@utils/ajax';

export function loginCheck (user, pass) {
    let data = {
        user,
        pass
    };
    return ajax({
        url: '/login/loginCheck',
        method: 'post',
        data: data
    });
}
export function getInfo (token) {
    return ajax({
        url: '/user/info',
        method: 'get',
        params: { token }
    });
}