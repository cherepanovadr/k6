import http from 'k6/http';
//https://k6.io/docs/using-k6/tags-and-groups/
export const options = {
    thresholds: {
        http_req_duration: ['p(95)<1000'],
        'http_req_duration{status:200}': ['p(95)<1000'],
        'http_req_duration{status:201}': ['p(95)<1000'],
        'http_req_duration{method:POST}': ['p(95)<1000'], // 0s does not exist
        'http_req_duration{page:order}': ['p(95)<1000'], 
       //custom check tag
        'checks{page:order}': ['rate>=0.99'], 
    }
}

export default function () {
   let res = http.get('https://run.mocky.io/v3/84ef4817-0243-443b-89da-b17fd9120fca');
    http.get('https://run.mocky.io/v3/3539cc77-29d0-48f9-9cc9-84d9b91f0fe1?mocky-delay=2000ms');

    //custom tag
     http.get('https://run.mocky.io/v3/3539cc77-29d0-48f9-9cc9-84d9b91f0fe1?mocky-delay=2000ms,',
    {
        tags: {
            page: 'order'
        }
    });
    check(res,{
        'status is 200': (r) => r.status ===200},
        {page:'order'}
        )
}