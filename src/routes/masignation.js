const Router = require('koa-router');

const router = new Router();


// Agregamos las rutas de las asignaciones

// GET /masignation
router.get('/', async (ctx) => {
    try {
        const masignation = await ctx.orm.MAsignation.findAll();
        ctx.body = JSON.stringify(masignation);
    } catch (error) {
        console.log(error);
        ctx.throw(500, error);
    }
});

// GET /masignation/:id
router.get('/:id', async (ctx) => {
    try {
        const masignation = await ctx.orm.MAsignation.findByPk(ctx.params.id);
        if (!masignation) {
            ctx.throw(404, 'Masignation not found');
        } else {
            ctx.body = JSON.stringify(masignation);
        }
    } catch (error) {
        console.log(error);
        ctx.throw(500, error);
    }
});


// GET /masignation/maq/:id_maq
router.get('/maq/:id_maq', async (ctx) => {
    try {
        const masignation = await ctx.orm.MAsignation.findAll({
            where: {
                id_maq: ctx.params.id_maq
            }
        });

        if (!masignation) {
            ctx.throw(404, 'Masignation not found');
        } else {
            ctx.body = JSON.stringify(masignation);
        }
    } catch (error) {
        console.log(error);
        ctx.throw(500, error);
    }
});

// GET /masignation/project/:id_pro
router.get('/project/:id_pro', async (ctx) => {
    try {
        const masignation = await ctx.orm.MAsignation.findAll({
            where: {
                id_pro: ctx.params.id_pro
            }
        });

        if (!masignation) {
            ctx.throw(404, 'Masignation not found');
        } else {
            ctx.body = JSON.stringify(masignation);
        }
    } catch (error) {
        console.log(error);
        ctx.throw(500, error);
    }
});


// GET /masignation/:id_maq/:id_pro
router.get('/:id_maq/:id_pro', async (ctx) => {
    try {
        const masignation = await ctx.orm.MAsignation.findAll({
            where: {
                id_maq: ctx.params.id_maq,
                id_pro: ctx.params.id_pro
            }
        });

        if (!masignation) {
            ctx.throw(404, 'Masignation not found');
        } else {
            ctx.body = JSON.stringify(masignation);
        }
    } catch (error) {
        console.log(error);
        ctx.throw(500, error);
    }
});


// POST /masignation
router.post('/', async (ctx) => {
    try {
        if (ctx.request.body) {
            console.log(ctx.request.body);
            const masignation = await ctx.orm.MAsignation.create(
                ctx.request.body
                );
            ctx.body = JSON.stringify(masignation);
        } else {
            ctx.throw(400, 'Bad request');
        }
    } catch (error) {
        console.log(error);
        ctx.throw(500, error);
    }
});


// PATCH /masignation/:id

router.patch('/:id_maq', async (ctx) => {
    try {
        const masignation = await ctx.orm.MAsignation.findByPk(ctx.params.id_maq);
        if (!masignation) {
            ctx.throw(404, 'Masignation not found');
        } else {
            await masignation.update(ctx.request.body);
            ctx.body = JSON.stringify(masignation);
        }
    } catch (error) {
        console.log(error);
        ctx.throw(500, error);
    }
});


// DELETE /masignation/:id
router.delete('/:id_maq', async (ctx) => {
    try {
        const masignation = await ctx.orm.MAsignation.findByPk(ctx.params.id_maq);
        if (!masignation) {
            ctx.throw(404, 'Masignation not found');
        } else {
            await masignation.destroy();
            ctx.body = JSON.stringify(masignation);
        }
    } catch (error) {
        console.log(error);
        ctx.throw(500, error);
    }
});



module.exports = router;