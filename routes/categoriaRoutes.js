import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
    try {
       const { limit } = req.query;

        const categorias = await prisma.categoria.findMany({
            take: limit ? Number(limit) : undefined, 
        });
        res.status(200).json(categorias)
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar categorias" })
    }
})


router.post('/', async (req, res) => {
    try {
        const { name, image } = req.body;
        const novaCategoria = await prisma.categoria.create({
            data: {
                name: name,
                image: image,
                slug: name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-')
            }
        });
        res.status(201).json(novaCategoria);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Erro ao criar categoria." });
    }
})


router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { name, image } = req.body
        const categoriaAtualizada = await prisma.categoria.update({
            where: { id },
            data: {
                name: name,
                image: image,
                slug: name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-')
            }
        })
        res.status(200).json(categoriaAtualizada)
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Erro ao atualizar categoria." });
    }
})


router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const categoriaDeletada = await prisma.categoria.delete({
            where: { id }
        })
        res.status(200).json(categoriaDeletada)
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Erro ao excluir categoria" });
    }
})


export default router