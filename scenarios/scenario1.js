import http from 'k6/http';
import {check} from 'k6';
import {sleep} from 'k6';
import exec from 'k6/execution'
import {Counter, Trend} from 'k6/metrics'; //custom metric is based on response options
//https://k6.io/docs/javascript-api/k6-http/


export const options = {
    vus: 10,
    duration:'10s',
    thresholds: {
        http_req_duration: ['p(95)<534'],
        http_req_duration: ['max<645.67'],
        http_req_failed: ['rate<0.1'],
        http_reqs: ['count>20'],
        http_reqs: ['rate>4'],
        vus: ['value > 4'],
        checks: ['rate>=0.9'],
        my_counter: ['count>0'],
        response_time_news_page: ['p(95)<534', 'p(99)<734'],
        }
}


let myCounter = new Counter('my_counter');
let newsPageResponseTrend = new Trend('response_time_news_page');

export default function () {
   let res = http.get('https://test.k6.io' + ( exec.scenario.iterationInTest === 1 ? 'foo': ''));                           
   myCounter.add(1);    
   sleep(2);

    res = http.get('https://test.k6.io/news.php');
   newsPageResponseTrend.add(res.timings.duration);
   sleep(1);

   

//built-in metrics
check(res, {
        'status is 200':(r) => r.status === 200,
        'page is startPage':(r) => r.body.includes(' Record check failures')
    }); 
}