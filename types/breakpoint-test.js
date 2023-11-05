import http from 'k6/http';
import {sleep} from 'k6'

export const options = {
    stages : [{
            duration: "2h",
            target: 50 //5000000 //number of users is higher
        },         
        
    ]
}



export default function(){
http.get('https://test.k6.io');

}