var express = require('express');
var router = express.Router();
var estadiosController = require('../controllers/estadiosController');

/* GET users listing. */
router.get('/:nombre', estadiosController.getOne);
router.get('/', estadiosController.getAll);

router.post('/',estadiosController.create);
router.put('/:nombre', estadiosController.update);
router.delete('/:nombre',estadiosController.delete);

module.exports = router;

