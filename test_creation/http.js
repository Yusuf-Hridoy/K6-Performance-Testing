import http from 'k6/http';
import { sleep } from 'k6'; 



export default function () {
   const res =  http.get('https://test.k6.io');
    console.log(res.status); // to print status code
    console.log(res.body);  // to print response body
    sleep(1);
}