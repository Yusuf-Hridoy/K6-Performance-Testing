import http from 'k6/http';
import { sleep } from 'k6'; 
import { check } from 'k6';


// ...existing code...
export const options = {
    
}; 


export default function () {
  const res = http.post('https://restful-booker.herokuapp.com/auth', {
    body: JSON.stringify({
      username: 'admin',
      password: 'password123',
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  console.log(res.headers);
  check(res, {
    'status code  is 200': (res) => res.status === 200,

   
    
  });
  ;
}                   
