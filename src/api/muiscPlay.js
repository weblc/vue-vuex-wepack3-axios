import ajax from '@utils/ajax';

export function getMusic (token) {
    return ajax({
        url: '/user/getMusic',
        method: 'get',
        params: { token }
    });
}