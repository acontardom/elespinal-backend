const Router = require('koa-router');

const { Op } = require('sequelize');
const router = new Router();

const prorationService = require('../utils/proration');


// Agregamos las rutas de las asignaciones

// GET /pasignation
router.get('/', async (ctx) => {
    try {
        const pasignation = await ctx.orm.PAsignation.findAll();
        ctx.body = JSON.stringify(pasignation);
    } catch (error) {
        console.log(error);
        ctx.throw(500, error);
    }
});

// GET /pasignation/:id
router.get('/:id', async (ctx) => {
    try {
        const pasignation = await ctx.orm.PAsignation.findByPk(ctx.params.id);
        if (!pasignation) {
            ctx.throw(404, 'Pasignation not found');
        } else {
            ctx.body = JSON.stringify(pasignation);
        }
    } catch (error) {
        console.log(error);
        ctx.throw(500, error);
    }
});


// GET /pasignation/person/:id_per
router.get('/person/:id_per', async (ctx) => {
    try {
        const pasignation = await ctx.orm.PAsignation.findAll({
            where: {
                id_per: ctx.params.id_per
            }
        });
        
        if (!pasignation) {
            ctx.throw(404, 'Pasignation not found');
        } else {
            ctx.body = JSON.stringify(pasignation);
        }
    } catch (error) {
        console.log(error);
        ctx.throw(500, error);
    }
});


// GET /pasignation/project/:id_pro
router.get('/project/:id_pro', async (ctx) => {
    try {
        const pasignation = await ctx.orm.PAsignation.findAll({
            where: {
                id_pro: ctx.params.id_pro
            }
        });

        if (!pasignation) {
            ctx.throw(404, 'Pasignation not found');
        } else {
            ctx.body = JSON.stringify(pasignation);
        }
    } catch (error) {
        console.log(error);
        ctx.throw(500, error);
    }
});


// GET /pasignation/:id_per/:id_pro
router.get('/:id_per/:id_pro', async (ctx) => {
    try {
        const pasignation = await ctx.orm.PAsignation.findOne({
            where: {
                id_per: ctx.params.id_per,
                id_pro: ctx.params.id_pro
            }
        });
        
        if (!pasignation) {
            ctx.throw(404, 'Pasignation not found');
        } else {
            ctx.body = JSON.stringify(pasignation);
        }
    } catch (error) {
        console.log(error);
        ctx.throw(500, error);
    }
});


// POST /pasignation
router.post('/', async (ctx) => {
    try {
        console.log(ctx.request.body);
        const pasignation = await ctx.orm.PAsignation.create(ctx.request.body);
        ctx.body = JSON.stringify(pasignation);
    } catch (error) {
        console.log(error);
        ctx.throw(500, error);
    }
});


// PATCH /pasignation/:id

router.patch('/:id', async (ctx) => {
    try {
        const pasignation = await ctx.orm.PAsignation.findByPk(ctx.params.id);
        if (!pasignation) {
            ctx.throw(404, 'Pasignation not found');
        } else {
            await pasignation.update(ctx.request.body);
            ctx.body = JSON.stringify(pasignation);
        }
    } catch (error) {
        console.log(error);
        ctx.throw(500, error);
    }
});


// DELETE /pasignation/:id
router.delete('/:id', async (ctx) => {
    try {
        const pasignation = await ctx.orm.PAsignation.findByPk(ctx.params.id);
        if (!pasignation) {
            ctx.throw(404, 'Pasignation not found');
        } else {
            await pasignation.destroy();
            ctx.body = JSON.stringify(pasignation);
        }
    } catch (error) {
        console.log(error);
        ctx.throw(500, error);
    }
});


// GET /proration/:month/:year`
router.get('/proration/:month/:year', async (ctx, next) => {
    try {
        const monthSelected = parseInt(ctx.params.month);
        const yearSelected = parseInt(ctx.params.year);
        const initMonth = new Date(yearSelected, monthSelected - 1, 1);
        const endMonth = new Date(yearSelected, monthSelected, 0);

        const asignations = await ctx.orm.PAsignation.findAll({
            where: {
                [Op.or]: [
                    {
                        [Op.and]: [
                            {
                                init_date: {
                                    [Op.lte]: initMonth,
                                },
                            },
                            {
                                finish_date: {
                                    [Op.gte]: endMonth,
                                },
                            },
                        ],
                    },
                    {
                        init_date: {
                            [Op.between]: [initMonth, endMonth],
                        },
                    },
                    {
                        finish_date: {
                            [Op.between]: [initMonth, endMonth],
                        },
                    },
                ],
            },
        });
        
        // Calcular prorrateo
        const proration_month = prorationService.proration(asignations, monthSelected, yearSelected);
        
        ctx.body = JSON.stringify(proration_month);
    } catch (error) {
        ctx.throw(500, error);
    }
}

)




module.exports = router;