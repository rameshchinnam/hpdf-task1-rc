const express = require('express');
const https = require('https');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyAuthors = "";
var bodyPosts = "";
var authors = "";
var posts = "";
var authpostsummary = "";
var deny = "";

const task1App = express();
task1App.use(cookieParser());
//task1App.use(express.static('public'))
task1App.use(express.static(path.join(__dirname, '/public')));

//Task 1.1 - Hello World
task1App.get('/', (req, res) => res.send('Hello World! - Ramesh'))

//Task 1.2 - Fetch Authors and Posts and Display Author Post Summary
task1App.get('/authors', function(req, res, next){

https.get("https://jsonplaceholder.typicode.com/users", result => {
result.setEncoding("utf8");
result.on("data", data => {
      bodyAuthors += data;
    });
result.on("end", () => {
    authors = JSON.parse(bodyAuthors);
    /*for (var i=0; i < authors.length; i++){
        console.log('Author Id: ' + authors[i].id);
        console.log('Author Name: ' + authors[i].name);
      }*/
      next()
    });
  });
}, function(req, res, next){
https.get("https://jsonplaceholder.typicode.com/posts", result => {
result.setEncoding("utf8");
result.on("data", data => {
      bodyPosts += data;
    });
result.on("end", () => {
    posts = JSON.parse(bodyPosts);
    /*for (var i=0; i < posts.length; i++){
        console.log('Post Id: ' + posts[i].id);
        console.log('Post Title: ' + posts[i].title);
      }*/
      next()
    });
  });
}, function(req, res, next){
console.log('Author Count:'+authors.length+', Post Count:'+posts.length);
for (var i=0; i < authors.length; i++)
{
  count=0;
  for (var j=0; j < posts.length; j++)
  {
    if (authors[i].id === posts[j].userId) {
      count += 1;
    }
  }
  authpostsummary += '<tr><td>' + authors[i].name + '</td><td>' + count + '</td></tr>';
}
authpostsummary = '<h1 align="center">Author Post Summary</h1><table align="center"><tr><th align="left">Author Name</th><th>Count</th></tr>' + authpostsummary + '</table>'
res.send(authpostsummary);
})
//Task 1.3 Set Cookie
task1App.get('/setcookie',function(req, res, next){
  if (req.cookies.name === undefined){
     res.cookie('name', 'Ramesh');
     res.cookie('age', '36').send('Cookies are set');
     console.log('Cookies are set');
  }
  else{
    console.log('Cookies were already set');
    res.send('Cookies were already set!');
  }
  next()
}
)

//Task 1.4 Get Cookies
task1App.get('/getcookies',function(req, res, next){
  if (req.cookies.name === undefined){
     console.log('Cookies have not been setup');
     res.send('Cookies have not been setup');
  }
  else{
    console.log('Cookies:');
    console.log(req.cookies);
    res.send(req.cookies);
  }
  next()
}
)
//Delete Cookies
task1App.get('/clearcookie',function(req, res, next){
  if (req.cookies.name === undefined){
     console.log('Cookies have not been setup');
     res.send('Cookies have not been setup');
  }
  else{
    res.clearCookie('name');
    res.clearCookie('age');
    console.log('Cookies have been cleared!');
    res.send('Cookies have been cleared!');
  }
  next()
}
)

//Task 1.5 deny request
task1App.get('/robots.txt',function(req, res, next){

  /*https.get("https://httpbin.org/deny", result => {
  result.setEncoding("ascii");
  result.on("data", data => {
        deny += data;
      });
  result.on("end", () => {
      //deny = JSON.parse(JSON.stringify(deny));
      //res.send(deny);
      next()
      });
    })*/
  res.redirect("http://httpbin.org/deny");
  //res.location("http://httpbin.org/deny");
  next()
}
)

//Task 1.6 Render an HTML page at http://localhost:8080/html or an image at http://localhost:8080/image
task1App.get('/image', function(req, res, next){
res.send('<center><img src="http://localhost:8000/images/Google_Christmas2017.png" height="400" width="800"></center>');
next();
}
)

//Task 1.7 A textbox to take input and to display it
task1App.get('/input', function(req, res, next){
res.send('<form action="output"> Enter Text: <input type="text" name="Text1"> <br> <input type="submit" value="Submit"></form>');
next();
}
)

task1App.get('/output', function(req, res, next){
res.send("You entered " + req.query.Text1);
console.log("Entered Text is " + req.query.Text1);
next();
}
)

task1App.listen(8000, () => console.log('Example App Listnening on port 8000!'))
