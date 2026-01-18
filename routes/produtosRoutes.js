import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()



router.get('/', async (req, res) => {
    try {
       const { limit } = req.query;

        const produtos = await prisma.produto.findMany({
            take: limit ? Number(limit) : undefined, 
            include: {
                category: true 
            }
        });
        res.status(200).json(produtos)
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar produtos" })
    }
})

router.get('/:id', async (req, res) =>{
    const { id } = req.params
    try{
        const produto = await prisma.produto.findUnique({
        where: {
                id: id 
            },
            include: {
                category: true 
            }
            })

        res.status(200).json(produto)
    }catch(error) {
        res.status(500).json({ error: "Erro ao buscar produto"})
        console.log(id)
    }
})

router.post('/', async (req, res) => {
    try {
        const { name, price, description, categoryId, image } = req.body;
        const novoProduto = await prisma.produto.create({
            data: {
                title: name,
                price: parseFloat(price),
                description: description,
                categoryId: categoryId,
                image: image,
                slug: name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-')
            }
        });
        res.status(201).json(novoProduto);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Erro ao criar produto." });
    }
})


router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { name, price, description, categoryId, image } = req.body
        const produtoAtualizado = await prisma.produto.update({
            where: { id },
            data: {
                title: name,
                price: parseFloat(price),
                description: description,
                categoryId: categoryId,
                image: image,
                slug: name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '-')
            }
        })
        res.status(200).json(produtoAtualizado)
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Erro ao atualizar produto." });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const produtoDeletado = await prisma.produto.delete({
            where: { id }
        })
        res.status(200).json(produtoDeletado)
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Erro ao excluir produto" });
    }
})


export default router