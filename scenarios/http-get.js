import http from 'k6/http';
import {check} from 'k6';

//import https from 'k6/https';
//https://test-api.k6.io/
//https://k6.io/docs/using-k6/http-debugging/

export default function(){

let res = http.get('https://test-api.k6.io/public/crocodiles/');
const crocodileId = 7;


res = http.get(`https://test-api.k6.io/public/crocodiles/${crocodileId}/`);

console.log(res.json().name);
//assert
check(res, {
    'status is 200': (r)=> r.status === 200,
    'Crocodile is Sobek': (r) => r.json().name === 'Sobek'
});
}

