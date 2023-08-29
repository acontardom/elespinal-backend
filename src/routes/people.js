const Router = require('koa-router');

const router = new Router();


// Agregamos las rutas de las personas

// GET /people
router.get('/', async (ctx) => {
    try {
        const people = await ctx.orm.People.findAll();
        ctx.body = JSON.stringify(people);
    } catch (error) {
        console.log(error);
        ctx.throw(500, error);
    }
});

// GET /people/:id
router.get('/:id', async (ctx) => {
    try {
        const person = await ctx.orm.People.findByPk(ctx.params.id);
        if (!person) {
            ctx.throw(404, 'Person not found');
        } else {
            ctx.body = JSON.stringify(person);
        }
    } catch (error) {
        console.log(error);
        ctx.throw(500, error);
    }
});


// POST /people
router.post('/', async (ctx) => {
    try {
        if (ctx.request.body) {
            console.log(ctx.request.body);
            const person = await ctx.orm.People.create(
                ctx.request.body
                );
            ctx.body = JSON.stringify(person);
        } else {
            ctx.throw(400, 'Bad request');
        }
    } catch (error) {
        console.log(error);
        ctx.throw(500, error);
    }
});

// PATCH /people/:id

// DELETE /people/:id
router.delete('/:id', async (ctx) => {
    try {
        const person = await ctx.orm.People.findByPk(ctx.params.id);
        if (!person) {
            ctx.throw(404, 'Person not found');
        } else {
            // Buscar todas las PAsignations que tengan a esa persona
            // y eliminarlas
            const pasignations = await ctx.orm.PAsignation.findAll({
                where: {
                    PeopleId: person.id
                }
            });
            for (let i = 0; i < pasignations.length; i++) {
                await pasignations[i].destroy();
            }

            await person.destroy();
            ctx.body = JSON.stringify(person);
        }
    } catch (error) {
        console.log(error);
        ctx.throw(500, error);
    }
});





module.exports = router;