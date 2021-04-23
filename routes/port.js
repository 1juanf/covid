const {Router} = require('express');
const passport = require('passport');
const router = Router();
const {getPatient, update_tem, getPatient_1} = require('../database');
const { isAuthenticated } = require("../helpers/authenticate");

router.get('/port', isAuthenticated,async (req,res)=>{
    const rep = await getPatient();
    res.render('port',{users,rep});
});

router.post('/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    const {temp} = req.body;
    if(parseFloat(temp)<=38){
            const a = await update_tem(id,temp);
            req.flash('success', 'Actualizado');
            res.redirect('port');
        }
    else{
        const patient = await getPatient_1(id);
        const a = await update_tem(id,temp);
        res.render('./questions/questions',{users,patient})
    }
});



module.exports=router;   
