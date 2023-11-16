import http from 'k6/http';
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js';

//https://k6.io/docs/examples/data-parameterization/#from-a-json-file

//export from json
const data = new SharedArray('users with credentials', function () {
    return JSON.parse(open('./users.json')).users;
});

//export from csv
const csvData = new SharedArray('another data name', function () {
    // Load CSV file and parse it using Papa Parse
    return papaparse.parse(open('./users.csv'), { header: true }).data;
  });
  console.log(csvData);

export default function () {

    data.forEach(element => {
        const credentials = {
            username: element.username,
            password: element.password,
        }

        const params = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        let res = http.post(
            'https://test-api.k6.io/user/register/',
            JSON.stringify(credentials),
            params);
    });
}

