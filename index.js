const express = require('express')
const Joi = require('joi');



const app = express()

app.use(express.json())
let courses = [
    { id: 1, titre: "Angular" },
    { id: 2, titre: "Nodejs" },
    { id: 3, titre: "Mango" }]

app.get('/', (req, res) => { // creation de la route '/' qui declanche la methode 
    res.send("hello ayoub")
})

app.get('/app/courses/:id', (req, res) => {
    let cours = courses.find(course => course.id === parseInt(req.params.id))
    if (!cours) {
        res.status(404).send("introuvable")
    } else {
        res.send(cours)
    }
})
app.put('/app/courses/:id',(req,res)=>
{
    //verifier l'existance ou non 
    let cours = courses.find(course=>course.id===parseInt(req.params.id))
    if(!cours)
    {
        res.status(404).send('titre introuvable')

    }
    //validation de course 

    const schema = Joi.object({titre: Joi.string().alphanum().required()})
    const {error, value}=schema.validate(req.body)
    if(error)
        res.status(404).send('error shema ')
    //modifiaction de cours 
    cours.titre=value.titre;
    res.send(cours)
    //envoyer le code 
})
app.post('/app/courses', (req, res) => {
    let cours = {
        id: courses.length + 1,
        title: req.body.title
    }
    const schema = Joi.object({ title: Joi.string().alphanum().required() })
    const { error, value } = schema.validate(req.body)
    if (error) {
        res.status(400).send(error.details[0].message)
    }
    courses = [...courses, cours]
    res.send(value)
})
//joi systeme pour valider les informations 
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`im here${port}`))//travailer avec varia d'environ pour que ce soir le port dynamiqque
