const express = require("express")
const app = express()
const cors = require("cors")

app.use(express.json())
app.use(cors())

let people = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/", (req,res) => {
    res.send("<h2>This is a homepage</h2>")
})

app.get("/api/persons", (req,res) => {
    res.json(people)
})

app.get("/info", (req, res) => {
  res.send(`<h2>Phonebook contains info for ${people.length} people<br></br>${new Date()}`)
})

app.get("/api/persons/:id", (req,res) => {
    const id = req.params.id
    const person = people.find(person => person.id === id)
    if (person){
      res.json(person)
    }
    else{
      res.status(404).end("Person not found")
    }
})

app.post("/api/persons", (req, res) => {
    const body = req.body
    if(!(body.name && body.number)){
      return res.status(400).json({"data": "missing"})
    }
    const overlap = people.find(person => person.name === body.name)
    if (overlap){
      return res.status(400).json({"message": "person already exists"})
    }
    const newPerson = {
      id: String(Math.floor(Math.random() * 100)),
      name: body.name,
      number: body.number
    }
    people = people.concat(newPerson)
    res.status(200).json(newPerson)
})

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id
  people = people.filter(person => person.id !== id)
  res.status(200).json({"action": "successful"})
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Listening to http://localhost:${PORT}`)
})