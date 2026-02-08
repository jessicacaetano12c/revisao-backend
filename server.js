import express from 'express'

const app = express()
const port = 3333

app.use(express.json())

app.get('/', (request, response) => {
  return response.json({
    message: 'Oiiiiiiiiiiiiiiiiiiiiiiiiiii marcinho'
  })
})

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`)
})