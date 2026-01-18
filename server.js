import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import categoriaRoutes from './routes/categoriaRoutes.js'
import produtosRoutes from './routes/produtosRoutes.js'
const app = express()
app.use(express.json())
app.use(cors())


app.use('/categorias', categoriaRoutes)
app.use('/produtos', produtosRoutes)



app.listen(3000, () => {
    console.log("Porta rodando em http://localhost:3000")
})