import express from 'express'
import mysql from 'mysql2/promise'
import cors from 'cors'

const app = express()
const port = 3333

app.use(cors())
app.use(express.json())

// Configuração do pool do MySQL
const pool = mysql.createPool({
  host: 'benserverplex.ddns.net',
  user: 'alunos',
  password: 'senhaAlunos',
  database: 'web_03mc',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

// Rota para cadastrar produtos
app.post('/produtos', async (request, response) => {
  const { nome, preco, categoria, descricao } = request.body

  if (!nome || !preco || !categoria || !descricao) {
    return response.status(400).json({ message: 'Todos os campos são obrigatórios' })
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO products_jessica (name, price, category, description) VALUES (?, ?, ?, ?)',
      [nome, preco, categoria, descricao]
    )
    return response.status(201).json({ message: 'Produto cadastrado com sucesso!' })
  } catch (error) {
    console.error(error)
    return response.status(500).json({ message: 'Erro ao cadastrar produto' })
  }
})

// Rota para exibir todos os produtos
app.get('/produtos', async (request, response) => {
  try {
    const [rows] = await pool.query('SELECT id, name as nome, price as preco, category as categoria, description as descricao FROM products_jessica')
    return response.json(rows)
  } catch (error) {
    console.error(error)
    return response.status(500).json({ message: 'Erro ao buscar produtos' })
  }
})

// Rota para deletar produto por ID
app.delete('/produtos/:id', async (request, response) => {
  const { id } = request.params

  try {
    const [result] = await pool.query('DELETE FROM products_jessica WHERE id = ?', [id])

    if (result.affectedRows === 0) {
      return response.status(404).json({ message: 'Produto não encontrado' })
    }

    return response.json({ message: 'Produto removido com sucesso!' })
  } catch (error) {
    console.error(error)
    return response.status(500).json({ message: 'Erro ao deletar produto' })
  }
})

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`)
})
