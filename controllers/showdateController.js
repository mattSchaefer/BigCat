var ShowDate = require('../models/showdate.model');
exports.listDates = function(req, res){
    ShowDate.find(function(err,dates){
        if(err)
            res.status(500).send({message: "some error occured while retrieving the show dates"});
        else{res.send(dates);}
    });
};
exports.createDate = function(req, res){
    if(!req.body.title)
        res.status(400).send({message: "title cannot be empty"});
    var showdate = new ShowDate({
        title: req.body.title || 'No title',
        venu: req.body.venu || 'No venu',
        address: req.body.address || 'No address',
        date: new Date(req.body.date) || new Date()
    });
    showdate.save(function(err, data){
        console.log(data);
        if(err){
            console.log(err);
            res.status(500).send({message: "some error occured while creating the showdate"});
        }else{res.send(data);}
    });
};
exports.deleteDate = function(req, res){
    ShowDate.remove({_id: req.params.id}, function(err, data){
        if(err)
            res.status(500).send({message: "could not delete showdate with id " + req.params.id});
        else{res.send({message: "note deleted successfully"});}
    });
};
exports.updateDate = function(req, res){
    ShowDate.findById(req.params.id, function(err, showdate){
        if(err)
            res.status(500).send({message: "could not retrieve showdate with id"+ req.params.id});
        showdate.title = req.body.title;
        showdate.venu = req.body.venu;
        showdate.address = req.body.address;
        showdate.date = new Date(req.body.date);
        showdate.save(function(err, data){
            if(err)
                res.status(500).send({message: "couldnot update date with id" + req.params.id});
        });
    });
};
exports.getDateById = function(req, res){
    ShowDate.findById(req.params.id, function(err, data){
        if(err)
            res.status(500).send({message: "could not retrieve showdate with id"+ req.params.id});
        else{res.send(data);}
    });
};
//module.exports = this.exports;
