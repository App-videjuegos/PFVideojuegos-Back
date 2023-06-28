const { Router } = require("express");
const express = require("express");
const { Users, Sales, Videogame } = require('../db');


const router = Router();
router.use(express.json());

router.get('/', async (req, res) => {
    try {
        let resultBD = await Sales.findAll({
            include: [{
                model: Users,
                as: 'user',
                attributes: ["id", "user", "fullname", "image"],
            },
            ],
            attributes: { exclude: ['userId'] },
        })
        if (resultBD.length <= 0) {
            res.status(404).json({ error: "No hay ventas para mostrar" })
        } else {

            for (const obj of resultBD) {
              for (const item of obj.items) {
                const result = await Videogame.findAll({
                  where: { id: item.videogameId },
                  attributes: ["id", "image"],
                });
        
                if (result.length > 0) {
                  const videogameData = result[0].get();
                  item.image = videogameData.image; // Agregar el atributo deseado a item
                }
        
                //item.totalPrice = item.unitPrice * item.quantity; solo si se desea el preciototal por cada item
              }
            }     
            res.status(201).json(resultBD);
        }
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});


router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        let resultBD = await Sales.findAll({
            where: { userId: id },
            include: [{
                model: Users,
                as: 'user',
                attributes: ["id", "user", "fullname", "image"],
            },
            ],
            attributes: { exclude: ['userId'] },
        })
        if (resultBD.length <= 0) {
            res.status(404).json({ error: "No hay ventas para mostrar" })
        } else {

            for (const obj of resultBD) {
              for (const item of obj.items) {
                const result = await Videogame.findAll({
                  where: { id: item.videogameId },
                  attributes: ["id", "image"],
                });
        
                if (result.length > 0) {
                  const videogameData = result[0].get();
                  item.image = videogameData.image; // Agregar el atributo deseado a item
                }
        
                //item.totalPrice = item.unitPrice * item.quantity; solo si se desea el preciototal por cada item
              }
            }     
            res.status(201).json(resultBD);
        }
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});


module.exports = router;