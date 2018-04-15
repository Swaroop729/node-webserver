const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var port = process.env.PORT || 3000;

var app = express();

hbs.registerHelper('Getcurrentyear',()=>{
    return new Date().getFullYear()
})

hbs.registerHelper('Capitalize',(text)=>{
        return text.toUpperCase();
})

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));

app.use((req,res,next)=>{
    res.render('maintenance.hbs')
})

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now} ${req.method}  ${req.url}`
    console.log(log);
    fs.appendFile('Server.log',log + '\n',(error)=>{console.log(error)} )
    next();
})




app.get('/',(req,res)=>{
 res.render('Home.hbs',{
     Title:"Home",
 });
})

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        Title : "About Page Title through dynamic way",
    })
})

app.listen((port),()=>{
    console.log(`The server has been started at ${port} !!!`);
});