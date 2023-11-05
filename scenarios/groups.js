import http from 'k6/http';
import { check, group, sleep } from 'k6';

//https://k6.io/docs/using-k6/tags-and-groups/#groups

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<1000'],
    }
}

export default function () {

    group("Main page", function () {
        let res = http.get('https://k6.io');
        check(res, {
            'status is 200': (r) => r.status === 200
        }),
            group('Assets', function () {
                http.get('https://fonts.googleapis.com/css?family=Roboto+Mono:300,400');
                http.get('https://k6.io/docs/app-ab0514fca924d47aa227.js');
            })


    });


    group("News page", function () {
        res = http.get("https://test-api.k6.io/public/crocodiles/");

        check(res, {
            'status is 200': (r) => r.status === 200
        },
        )

    });





    sleep(1);
}