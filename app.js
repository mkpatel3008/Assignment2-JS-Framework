
const express = require('express');
const port = process.env.PORT || 8080;

const app = express();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const config = require('./global/global');
mongoose.set('useFindAndModify', false);
mongoose.connect(config.db,{
    userNewUrlParser: true,
    useUnifiedTopology: true
})
.then(
    res =>
    {
        console.log("connected to the database");
    }
).catch(() =>{
    console.log("Connection failed");
});

app.use(express.json());
app.use(express.urlencoded({extended:true}))

const handlebars = require('express-handlebars');
const Employee = require('./models/employee.model');

app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    layoutsDir: `${__dirname}/views/layouts`,
    extname: 'hbs'
}))
app.use(express.static('public'));

app.get('/',(req, res) =>{
    res.render('home',{layout: 'home'});
});

app.get('/login',(req, res) =>{
    res.render('login',{layout: 'login'});
});


app.get('/signup',(req, res) =>{
    res.render('signup',{layout: 'signup'});
});
app.post('/newuser',async (req, res) =>{
    try{
        const newUser = new Employee({
         email : req.body.email,
         password : req.body.password,
        })
     const newEmployee = await newUser.save();
     
     res.status(201).render("login");
 
    }catch(error){
        res.status(400).send(error);
    }
 });
 

app.listen(port, () =>{
    console.log(`App listening to port ${port}`);
});

