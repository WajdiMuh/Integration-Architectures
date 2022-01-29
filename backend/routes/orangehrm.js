const express = require('express');
const router = express.Router();
const FormData = require('form-data');
const {Employee} = require('../classes/Employee');
const legacysystemhandler = require('../legacysystemhandler');
router.use(express.json());

router.get('/readallemployees',(req,res) =>{
    legacysystemhandler.executegetorangehrmcall('employee/search').then(function(result) 
        {
            let employees = [];
            result.data.data.forEach(emp => {
                employees.push(Employee.fromorangeJson(emp));
            });
            res.send(employees);
        }
    )
});

async function reademployee(req,res){
    return await legacysystemhandler.executegetorangehrmcall('employee/' + req.params.id).then(function(result) 
        {
            res.send(Employee.fromorangeJson(result.data.data));
        }
    ).catch(function() 
        {
            res.status(404).send('employee not found');
        }
    );
}

router.get('/reademployee/:id',reademployee);

router.post('/addbonussalary/:id',(req,res) =>{
    const formData = new FormData();
    formData.append('year', req.body.year);
    formData.append('value', req.body.value);
    legacysystemhandler.executepostorangehrmcall('employee/' + req.params.id + '/bonussalary',formData).then(function(result) 
        {
            res.send("bonus added successfully");
        }
    ).catch(function(err) 
        {
            res.status(400).send(err);
        }
    );
});

module.exports = {router,reademployee};