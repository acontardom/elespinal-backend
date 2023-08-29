const Router = require('koa-router');

const router = new Router();


// Agregamos las rutas de las equipos

// GET /equipment
router.get('/', async (ctx) => {
    try {
        const equipment = await ctx.orm.Equipment.findAll();
        ctx.body = JSON.stringify(equipment);
    } catch (error) {
        console.log(error);
        ctx.throw(500, error);
    }
});


// GET /equipment/:id
router.get('/:id', async (ctx) => {
    try {
        const equipment = await ctx.orm.Equipment.findByPk(ctx.params.id);
        if (!equipment) {
            ctx.throw(404, 'Equipment not found');
        } else {
            ctx.body = JSON.stringify(equipment);
        }
    } catch (error) {
        console.log(error);
        ctx.throw(500, error);
    }
});


// POST /equipment
router.post('/', async (ctx) => {
    try {
        if (ctx.request.body) {
            console.log(ctx.request.body);
            const equipment = await ctx.orm.Equipment.create(
                ctx.request.body
                );
            ctx.body = JSON.stringify(equipment);
        } else {
            ctx.throw(400, 'Bad request');
        }
    } catch (error) {
        console.log(error);
        ctx.throw(500, error);
    }
});


// PATCH /equipment/:id

// DELETE /equipment/:id
router.delete('/:id', async (ctx) => {
    try {
        const equipment = await ctx.orm.Equipment.findByPk(ctx.params.id);
        if (!equipment) {
            ctx.throw(404, 'Equipment not found');
        } else {
            // Buscar todas las reservas que tengan el equipo
            const reservations = await ctx.orm.MAsignation.findAll({
                where: {
                    EquipmentId: ctx.params.id
                }
            });
            // Borrar todas las reservas que tengan el equipo
            for (let i = 0; i < reservations.length; i++) {
                await reservations[i].destroy();
            }
            // Borrar el equipo
            await equipment.destroy();
            ctx.body = JSON.stringify(equipment);
        }
    } catch (error) {
        console.log(error);
        ctx.throw(500, error);
    }
});


module.exports = router;