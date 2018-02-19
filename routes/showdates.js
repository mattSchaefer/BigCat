var express = require('express');
var router = express.Router();
// module.exports = function(app){


    var showdate_controller = require('../controllers/showdateController');
//was: app.get
    router.get('/', showdate_controller.listDates);
    router.post('/', showdate_controller.createDate);
    router.get('/:id', showdate_controller.getDateById);
    router.delete('/:id', showdate_controller.deleteDate);
    router.put('/:id', showdate_controller.updateDate);
// }
module.exports = router;
