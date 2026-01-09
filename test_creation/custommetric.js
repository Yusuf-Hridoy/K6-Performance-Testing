import http from 'k6/http';
import { sleep } from 'k6'; 
import {Counter, Trend}from 'k6/metrics';


// ...existing code...
export const options = {
    stages: [
        { duration: '5s', target: 5 }, // ramp up to 15 users over 15 seconds
    ], // This closing bracket was missing
    thresholds: {
        'http_req_duration': ['p(95)<500'], // 95% of requests must complete below 500ms
    },
     
}; 

let myCounter = new Counter('my_counter');
let myTrend = new Trend('my_trend');
// ...existing code...
    


export default function () {
   const res =  http.get('https://test.k6.io');
    myCounter.add(1);  // custom metric increment
   sleep(1);

   const res1 = http.get('https://quickpizza.grafana.com/news.php');
    myTrend.add(res1.timings.duration);
    sleep(1)
  ;
}                   

