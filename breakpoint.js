import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    stages: [
        { duration: '30s', target: 40 }, // ramp up to 50 users over 15 seconds
    ],
};

export default function () {
    http.get('https://test.k6.io');
  sleep(1); 
  
 
}