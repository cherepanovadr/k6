import http from 'k6/http';
//https://k6.io/docs/using-k6/tags-and-groups/
export const options = {
    thresholds: {
        http_req_duration: ['p(95)<1000']
    }
}

export default function () {
    http.get('https://run.mocky.io/v3/84ef4817-0243-443b-89da-b17fd9120fca');
    http.get('https://run.mocky.io/v3/3539cc77-29d0-48f9-9cc9-84d9b91f0fe1?mocky-delay=2000ms');

}