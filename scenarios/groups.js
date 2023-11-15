import http from 'k6/http';
import { check, group, sleep } from 'k6';

//https://k6.io/docs/using-k6/tags-and-groups/#groups

export const options = {
    thresholds: {
        http_req_duration: ['p(95)<1000'],
        'http_req_duration{expected_response:true}': ['p(95)<1000'],
        group_duration: ['p(95)<1000'],
        'group_duration{group:::Main page}': ['p(95)<1000'], //wil return a sum of all requets in the group/sub group
        'group_duration{group:::News page}': ['p(95)<1000'],
        'group_duration{group:::Main page::Assets}': ['p(95)<1000'],
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
       let res2 = http.get("https://test-api.k6.io/public/crocodiles/");
       let res500 = http.get("https://run.mocky.io/v3/0324ebeb-c806-4b68-b154-f9240f1a085a/");

        check(res2, {
            'status is 200': (r) => r.status === 200
        },
        )

    });

}