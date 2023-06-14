const Router = require('express');
const router = new Router();

const ApiContoller = require('../controllers/api.controller');

router.get('/get', ApiContoller.getExpense);
router.post('/create', ApiContoller.createExpense);
router.get('/getByDay/:day', ApiContoller.getFromDate);
router.post('/createLimit', ApiContoller.createLimit);
router.get('/getLimit/:day', ApiContoller.getLimit);

module.exports = router;