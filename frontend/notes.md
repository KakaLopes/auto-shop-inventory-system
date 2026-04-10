Register 
POST http://localhost:5000/api/auth/register
boby 
{
  "name": "Kaka",
  "phone": "0831151771",
  "email": "catalina-lopes@hotmail.com",
  "address": "Dublin",
  "password": "123456"
}
---
Login 
POST http://localhost:5000/api/auth/login

body 
{
"email": "catalina-lopes@hotmail.com",
  "address": "Dublin",
  "password": "123456"
}