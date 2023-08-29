const Router = require('koa-router');

const router = new Router();


// Agregamos las rutas de los proyectos

// GET /projects
router.get('/', async (ctx) => {
    try {
        const projects = await ctx.orm.Project.findAll();
        ctx.body = JSON.stringify(projects);
    } catch (error) {
        console.log(error);
        ctx.throw(500, error);
    }
});


// GET /projects/:id
router.get('/:id', async (ctx) => {
    try {
        const project = await ctx.orm.Project.findByPk(ctx.params.id);
        if (!project) {
            ctx.throw(404, 'Project not found');
        } else {
            ctx.body = JSON.stringify(project);
        }
    } catch (error) {
        console.log(error);
        ctx.throw(500, error);
    }
});


// POST /projects
router.post('/', async (ctx) => {
    try {
        if (ctx.request.body) {
            console.log(ctx.request.body);
            const project = await ctx.orm.Project.create(
                ctx.request.body
                );
            ctx.body = JSON.stringify(project);
        } else {
            ctx.throw(400, 'Bad request');
        }
    } catch (error) {
        console.log(error);
        ctx.throw(500, error);
    }
});

// PATCH /projects/:id
router.patch('/:id', async (ctx) => {
    try {
        const project = await ctx.orm.Project.findByPk(ctx.params.id);
        if (!project) {
            ctx.throw(404, 'Project not found');
        } else {
            await project.update(ctx.request.body);
            ctx.body = JSON.stringify(project);
        }
    } catch (error) {
        console.log(error);
        ctx.throw(500, error);
    }
});

// DELETE /projects/:id
router.delete('/:id', async (ctx) => {
    try {
        const project = await ctx.orm.Project.findByPk(ctx.params.id);
        if (!project) {
            ctx.throw(404, 'Project not found');
        } else {
            // Delete the project in Cascade
            await project.destroy();
            ctx.body = JSON.stringify(project);
        }
    } catch (error) {
        console.log(error);
        ctx.throw(500, error);
    }
});


module.exports = router;
