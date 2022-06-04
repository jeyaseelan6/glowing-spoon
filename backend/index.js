const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const UserModel = require('./models/Users');
const path = require('path');
// mongoose.connect('mongodb+srv://seelan:123@cluster0.efw3x.mongodb.net/MERN60?retryWrites=true&w=majority');

module.exports = mongoose.connect('mongodb://localhost:27017/Users',{
    useUnifiedTopology:true,
    useNewUrlParser:true
   
},err=>{
    if(err) console.log(`Error in DB ${err}`)
    console.log('DB connection success');
})

app.use(cors());
app.use(express.json());

app.get('/getUsers',(req,res)=>{
     UserModel.find({},(err,result)=>{
        if(err){
            res.json(err);
        } else{
            res.json(result);
        }
    })
} )

__dirname = path.resolve();
app.use(express.static(path.join(__dirname,'/frontend/build')));
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'frontend','build','index.html'));
})   


app.post('/createUser',async(req,res)=>{
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();
    res.json(user);
})

app.put('/:id',(req,res)=>{
    UserModel.findOneAndUpdate({
         _id: req.params.id
    },req.body,{
        new: true
    },(err,doc)=>{
        if(err) console.log(err)
      
        res.json(doc)
    })
})

app.delete('/:id',(req,res)=>{
    UserModel.findByIdAndDelete(req.params.id,(err,doc)=>{
        if(err) console.log(err)
        res.json(doc);
        
    })
})


app.listen(3002,()=>{
    console.log('Server runs Successfully');
})