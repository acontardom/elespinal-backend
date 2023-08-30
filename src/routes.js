const Router = require('koa-router');
const pasignation = require('./routes/pasignation');
const masignation = require('./routes/masignation');
const people = require('./routes/people');
const equipment = require('./routes/equipment');
const projects = require('./routes/projects');



const router = new Router();

router.use('/api/pasignation', pasignation.routes());
router.use('/api/masignation', masignation.routes());
router.use('/api/people', people.routes());
router.use('/api/equipment', equipment.routes());
router.use('/api/projects', projects.routes());

module.exports = router;
