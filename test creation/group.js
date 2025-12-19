import http from 'k6/http';
import { sleep } from 'k6'; 
import { check } from 'k6';
import { group } from 'k6';

// ...existing code...
export const options = {
    stages: [
        { duration: '5s', target: 5 }, // ramp up to 15 users over 15 seconds
    ], // This closing bracket was missing
   thresholds: {
    http_req_duration: ['p(95)<500']
    
   }    
     
};  
// ...existing code...
    


export default function () {
   group('group name', function () {
    const res =  http.get('https://test.k6.io');
    // assertion
     check(res, {
         'is status 200': (r) => r.status === 200,

        
     });
    sleep(1);

    group('group name2', function () {
        const res =  http.get('https://quickpizza.grafana.com/news.php');
        // assertion
         check(res, {
             'is status 200': (r) => r.status === 200,    

         });
        sleep(1);
    })


   })
}                   


//