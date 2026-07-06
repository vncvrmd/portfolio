import express from 'express'
import cors from 'cors'
import { about, projects, skills } from './data.js'

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.get('/api/about', (req, res) => {
  res.json({ about })
})

app.get('/api/skills', (req, res) => {
  res.json({ skills })
})

app.get('/api/projects', (req, res) => {
  res.json({ projects })
})

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please complete all fields.' })
  }

  console.log('Contact request:', { name, email, message })

  res.json({ message: 'Thank you! Your message has been received.' })
})

app.listen(PORT, () => {
  console.log(`Portfolio API running on http://localhost:${PORT}`)
})
