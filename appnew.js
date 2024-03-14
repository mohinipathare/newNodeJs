const express=require('express');
const fs=require('fs');
const body_parser=require('body-parser');

const app=express();

app.use(body_parser.urlencoded({extended:false}));

app.get('/login',(req,res,next)=>
{
    res.send(`<form onsubmit="localStorage.setItem('username',document.getElementById('username').value)" action="/submitUser" method="POST">
    <label>Enter your name</label>
    <input id="username" type="text" name="username"></input><br>
    <button type="submit">submit</submit>
    </form>`)
    //console.log(document.getElementById('username').value);
})
app.post('/submitUser',(req,res,next)=>{
    console.log(req.body);
    console.log(req.body.username);

    res.redirect('/');
})
app.get("/",(req,res)=>{
    console.log(req.body.username);
    fs.readFile("message.txt",(err,data)=>{
        if(err)
        {
            console.log(err)
            data='no data exist';
          //  res.send(data)
        }
           
            res.send(`
            <br>
            <form action="/displayMessageAndUsername" onsubmit="document.getElementById('username').value=localStorage.getItem('username')" method="POST">
            ${data}<br>
            <label>Enter message:</label>
            <input type="text" name="message" id="message">
            <input type="hidden" name="username" id="username">
            <button type=submit>submit</submit></form>
            `);
        
    })
})
app.post('/displayMessageAndUsername',(req,res,next)=>{
    console.log(req.body.username);
    console.log(req.body.message);
fs.writeFile("message.txt",`${req.body.username}:${req.body.message}`,{flag:'a'},(err)=>{err?console.log(err):res.redirect('/')})
})

app.listen(3000);

