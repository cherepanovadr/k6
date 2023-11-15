import http from 'k6/http';
import {sleep} from 'k6';
import exec from 'k6/execution';

export const options = {
    vus: 2,
    duration: '2s'

}


console.log('--- init stage --');

export function setup() {
    let res = http.get('https://test');
    if (res.error){
        exec.test.abort('Aborting test. Application is DOWN')
    }
    console.log('-- setup stage --');
    sleep(10);
    const data = {foo:'bar'}
    return data;
}

export default function (){
    console.log('-- VU stage --');
    console.log(data);
    sleep(1);
}

export function teardown() {
    console.log('-- Teardown stage --');
}