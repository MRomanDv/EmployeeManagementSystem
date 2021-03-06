const { decodeBase64 } = require('bcryptjs')
const express = require('express')
const app = express()
const dotenv = require('dotenv').config({path:'./ENV/.env'})
const db = require('./database/db')
const cors = require('cors')//this npm pack enables the requests from the front end to the backend


app.use(express.urlencoded({extended:false}))
app.use(express.json()) 
app.use(cors())

//REQUESTS
app.post('/create',(req,res)=>{
    const {name,age,country,position,wage} = req.body 

    db.query('INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)', [name,age,country,position,wage],(error,results)=>{
        if(error){
            console.log(error)
        }else {
            res.send('Values inserted')
        }
    })
})

app.get('/employees',(req,res)=> {
    db.query('SELECT * FROM employees', (error,results)=>{
        if(error){
            console.log(error)
        }else {
           res.send(results)
        }
    })
})

app.put('/update/:id',(req,res)=>{
    const {id,wage} = req.body
    db.query('UPDATE employees SET wage = ? WHERE id = ?', [wage,id],(err,results)=>{
        if (err){
            console.log(err)
        }else {
            res.send(results)
        }
    })
})

app.put('/updateAge/:id',(req,res)=>{
    const {id,age} = req.body
    db.query('UPDATE employees SET age = ? WHERE id = ?', [age,id],(err,results)=>{
        if (err){
            console.log(err)
        }else {
            res.send(results)
        }
    })
})

app.put('/updatePosition/:id',(req,res)=>{
    const {id,position} = req.body
    db.query('UPDATE employees SET position = ? WHERE id = ?', [position,id],(err,results)=>{
        if (err){
            console.log(err)
        }else {
            res.send(results)
        }
    })
})


app.delete('/delete/:id',(req,res)=>{
    const id = req.params.id
    db.query('DELETE FROM employees WHERE id = ?', id, (err , results)=>{
        if (err){
            console.log(err)
        }else {
            res.send(results)
        }
    })
})


//PORT
const port = process.env.PORT || 3001
app.listen(port,()=>{
    console.log('server is active on port: ' + port)
})
