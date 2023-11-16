import http from 'k6/http';
import { check } from 'k6';
//https://test-api.k6.io/
export default function () {
    const credentials = {
        username: 'test' + Date.now(),
        password: 'testPass',
    }
    const body = JSON.stringify(credentials);
    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    let res = http.post(
        'https://test-api.k6.io/user/register/',
        body,
        params);

    let login = http.post(
        'https://test-api.k6.io/auth/token/login/',
        body,
        params);

    let accessToken = login.json().access;


    let resp = http.get(
        'https://test-api.k6.io/my/crocodiles/',
        {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        }
    );


}