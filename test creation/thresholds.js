import http from 'k6/http';
import { sleep } from 'k6'; 
import { check } from 'k6';

// ...existing code...
export const options = {
    stages: [
        { duration: '15s', target: 15 }, // ramp up to 15 users over 15 seconds
    ], // This closing bracket was missing
    thresholds: {
        'http_req_duration': ['p(95)<500'], // 95% of requests must complete below 500ms
        'checks': ['rate>0.95'], // 95% of checks must pass
        'vus': ['value <=16'], // ensure we never exceed 16 VUs
    },
     
};  
// ...existing code...
    


export default function () {
   const res =  http.get('https://test.k6.io');
   // assertion
    check(res, {
        'is status 200': (r) => r.status === 200,
      //  'page is startpage': (r) => r.body.includes('Collection of simple web-pages')
        
    });
}                   


//