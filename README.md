This repository is for some sample tasks completed while learning node.js with express framework
To get this working you need to follow the below steps:
1) Download and install node.js
2) Install express framework
3) clone the repository and download it to your machine
4) Start the server at the command prompt in the root folder
   node index.js
   This will start the web server to listen on the port 8000
5) Request the below end point urls to test the sample tasks
   a) Hello World:
      http://localhost:8000/
   b) Get information from a public website, summarize and display
      http://localhost:8000/authors
   c) Set Cookies (Name and Age)
      http://localhost:8000/setcookie
   d) Get Cookie Values
      http://localhost:8000/getcookies
   e) Delete Cookies (to retest set and get Cookies)
      http://localhost:8000/clearcookie
   f) Deny a request (redirected to another website)
      http://localhost:8000/robots.txt
   g) To render an image
      http://localhost:8000/image
   h) To display a text box that takes user input and passes it to another endpoint url that logs the message and displays it in the response
      http://localhost:8000/input
