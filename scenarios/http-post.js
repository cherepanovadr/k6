import http from 'k6/http';
import {check} from 'k6';

export default function(){
    const body = JSON.stringify({
        username: 'test'+Date.now(),
        password: 'testPass'
    });
    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

let res = http.post('https://test-api.k6.io/user/register/',body, params);
}