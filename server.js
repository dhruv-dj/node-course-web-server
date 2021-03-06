const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 300;
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs');


app.use((req,res,next) => {
    var now = new Date().toString();
    var log =`${now} : ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server.log');
        }
    });
    next();
});


//app.use((req,res,next) => {
//   res.render('maintenence.hbs'); 
//    next();
//});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () =>{
   return new Date().getFullYear(); 
});

hbs.registerHelper('screamIt',() => {
   return text.toUpperCase(); 
});


app.get('/',(req,res) => {

  res.render('home.hbs', {
       pageTitle: 'Home Page',
       welcomeMessage: 'Welcome to this new template'
   });
});

app.get('/about', (req,res) => {
   res.render('about.hbs', {
       pageTitle: 'About Page',
       currentYear: new Date().getFullYear()
   });
});

app.get('/projects', (req,res) => {
   res.render('projects.hbs', {
       pageTitle: 'Project Page',
       currentYear: new Date().getFullYear(),
       welcomeMessage: 'Here you will find the link to all my projects'
   });
});

app.get('/bad', (req,res) => {
    res.send({
       errorCode : '404',
        errorMessage : 'Error' 
    });
});
app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});