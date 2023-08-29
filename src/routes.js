const Router = require('koa-router');
const pasignation = require('./routes/pasignation');
const masignation = require('./routes/masignation');
const people = require('./routes/people');
const equipment = require('./routes/equipment');
const projects = require('./routes/projects');



const router = new Router();

router.use('/pasignation', pasignation.routes());
router.use('/masignation', masignation.routes());
router.use('/people', people.routes());
router.use('/equipment', equipment.routes());
router.use('/projects', projects.routes());

module.exports = router;
