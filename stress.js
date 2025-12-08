import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    stages: [
        { duration: '15s', target: 20 }, // ramp up to 50 users over 15 seconds
        { duration: '20s', target: 25 }, // stay at 50 users for 5 minutes
        { duration: '10s', target: 30 },  // ramp down to 0 users over 2 minutes
    ],
};

export default function () {
    http.get('https://test.k6.io');
  sleep(1); 
  
 
}