import http from 'k6/http';
import { sleep } from 'k6'; 
import { check } from 'k6';


// ...existing code...
export const options = {
    
}; 


export default function () {
  // First, get a token for authentication
  const authRes = http.post('https://restful-booker.herokuapp.com/auth', 
    JSON.stringify({
      username: 'admin',
      password: 'password123',
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  
  const token = authRes.json('token');

  // PUT request to update booking ID 93
  const res = http.patch('https://restful-booker.herokuapp.com/booking/93', 
    JSON.stringify({
      firstname: 'James',
      lastname: 'Brown',
      totalprice: 154,
      depositpaid: true,
      bookingdates: {
        checkin: '2024-08-23',
        checkout: '2024-08-30'
      },
      additionalneeds: 'halua'
    }),
    {
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `token=${token}`,
      },
    }
  );

  console.log(res.headers);
  console.log(res.body);
  
  check(res, {
    'status code is 200': (res) => res.status === 200,
  });
}