import http from 'k6/http';
import { check, sleep } from 'k6';
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

//https://k6.io/docs/javascript-api/jslib/utils/randomintbetween/
//https://k6.io/docs/javascript-api/jslib/utils/randomstring/

export const options = {
    vus: 2,
    duration: '10s'
}


export default function () {
    const body = JSON.stringify({
        //use random string
        username: 'test' + randomString(3),
        password: 'secret|_' +  Date.now()
    });
    console.log(body);
    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    console.log(__ENV.BASE_URL);
    let res = http.post(`${__ENV.BASE_URL}/user/register/`, body, params);

    //add random sleep
    sleep(randomIntBetween(3,5));
}