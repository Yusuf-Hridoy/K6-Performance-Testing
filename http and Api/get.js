import http from 'k6/http';
import { sleep } from 'k6'; 


// ...existing code...
export const options = {
    
}; 


export default function () {
  const res = http.get('https://automationexercise.com/api/productsList')
  
  ;
}                   

