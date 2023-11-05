import http from 'k6/http';
import {sleep} from 'k6'

export const options = {
    stages : [{
            duration: "5s",
            target: 100 //users
        },
         {
            duration: "8h", //longer period in comparison with load
            target: 100
        },
        {
            duration: "5s",
            target: 0 
        }
    ]
}



export default function(){
http.get('https://test.k6.io');
sleep(1);
http.get('https://test.k6.io/contacts.php')
sleep(2);

http.get('https://test.k6.io/news.php')

}