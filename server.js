const express=require('express');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const knex=require('knex');

const register=require('./controllers/Register');
const signin=require('./controllers/Signin');
const profile=require('./controllers/Profile');
const image=require('./controllers/Image');
const db= knex({
	client:'pg',
	connection:{
		host:'127.0.0.1',
		user:'postgres',
		password:'29august',
		database:'smartbrain'
	}
});



const app=express();
app.use(bodyParser.json());
app.use(cors());





app.post('/signin',(req,res)=>{signin.handleSignin(req,res,bcrypt,db)})


app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)})


app.get('/profile/:id',(req,res)=>{profile.handleProfileGet(req,res,db)})

app.put('/image',(req,res)=>{image.handleImage(req,res,db)})




//Load hash password from DB.



// bcrypt.compare("veggies",hash,function(err,res){
// 	//res==false
// })

app.listen(3000,()=>{
	console.log('app is running on port 3000')
});


/*
/ -->res=this is working
/signin --->POST = success/fail
/register -->POST = user
/profile/:userId -->GET=user
/image -->PUT = user
*/