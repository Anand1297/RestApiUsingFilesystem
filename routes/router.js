const express= require('express');
const controllers= require('../controllers/controller')
 
const router = express.Router();

router.get('/',controllers.getData);

router.get('/:id', controllers.getDataById);

router.post('/',controllers.addData);

router.delete('/:id', controllers.deleteById);

router.put('/:id',controllers.updateById);

module.exports= router;