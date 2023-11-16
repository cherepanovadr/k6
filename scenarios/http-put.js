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
//create user
    let res = http.post(
        'https://test-api.k6.io/user/register/',
        body,
        params);
//login as user
    let login = http.post(
        'https://test-api.k6.io/auth/token/login/',
        body,
        params);
//get access token
    let accessToken = login.json().access;

//create Croci
    let resp = http.post(
        'https://test-api.k6.io/my/crocodiles/',
        JSON.stringify({
            "name": "Croci",
            "sex": 'M',
            "date_of_birth": '2022-09-09',
        }),
        {
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        }
    );
    let crociId = resp.json().id;
    
//Update Croci
    let resp2 = http.put(
        `https://test-api.k6.io/my/crocodiles/${crociId}/`,
        JSON.stringify({
            "name": "Updated Croci2",
            "sex": 'F',
            "date_of_birth": '2022-09-09',
        }),
        {
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'application/json'
            }
        }
    );


 
}