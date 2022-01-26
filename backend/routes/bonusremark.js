const express = require('express');
const router = express.Router();
const mongowrapper = require('../mongowrapper');
router.use(express.text());

router.post('/addremark/:id/:year',(req,res) =>{
    const id = parseInt(req.params.id);
    const year = parseInt(req.params.year);
    const remark = req.body;
    mongowrapper.addbonusremark(id,year,remark,function(result){
        if(result){
            res.status(201).send('added bonus remark successfully');
        }else{
            res.status(400).send('unable to add bonus remark');
        }
    });
});

module.exports = router;