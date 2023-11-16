import http from 'k6/http';
import {check} from 'k6';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

//import https from 'k6/https';
//https://test-api.k6.io/
//https://k6.io/docs/using-k6/http-debugging/
//https://k6.io/docs/javascript-api/jslib/utils/randomitem/

export default function(){

let res = http.get('https://test-api.k6.io/public/crocodiles/');
const crocodiles = res.json();
const crocodilesIDs = crocodiles.map(item=> item.id);
const crocodileId = randomItem(crocodilesIDs);
const crocodileName = crocodiles[0].name;
console.log(crocodilesIDs);
//get a random id from array

let res2 = http.get(`https://test-api.k6.io/public/crocodiles/${crocodileId}/`);

//assert
check(res2, {
    'status is 200': (r)=> r.status === 200,
   // 'crocodile is name': (r) => r.json().name === crocodileName
});
}

