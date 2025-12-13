import http from 'k6/http';
import { sleep } from 'k6'; 
import { check } from 'k6';


    


export default function () {
   const res =  http.get('https://test.k6.io');
   // assertion
    check(res, {
        'is status 200': (r) => r.status === 200,
      //  'page is startpage': (r) => r.body.includes('Collection of simple web-pages')
        
    });

    
}