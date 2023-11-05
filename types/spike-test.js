import http from 'k6/http';
import {sleep} from 'k6'

export const options = {
    stages : [{
            duration: "2m",
            target: 10 //10000 //number of users is higher
        },         
        {
            duration: "1m",
            target: 0 
        }
    ]
}



export default function(){
http.get('https://test.k6.io');

}