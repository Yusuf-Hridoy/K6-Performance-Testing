import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    stages: [
        { duration: '10s', target: 2 },   // ramp up to 2 users (baseline)
        { duration: '15s', target: 2 },    // stay at 2 users for 1 minute
        { duration: '10s', target: 10 },  // spike to 10 users suddenly
        { duration: '15s', target: 10 },   // stay at spike for 1 minute
        { duration: '10s', target: 2 },   // drop back to baseline
        { duration: '15s', target: 2 },    // recover at baseline
        { duration: '10s', target: 0 },   // ramp down to 0
    ],
};

export default function () {
    http.get('https://test.k6.io');
  sleep(1); 
  
 
}