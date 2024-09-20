const router = require ('express').Router();
let Maintainer = require('../models/maintainer.model');


router.route('/').get((req,res)=>{
    Maintainer.find()
        .then(maintainers=>res.json(maintainers))
        .catch(err => res.status(400).json('Error :- ' +err));
});

router.route('/add').post((req, res)=>{
    const EmpId = req.body.EmpId;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const designation = req.body.designation;
    const department = req.body.department;

    

    const newMaintainer = new Maintainer({
        EmpId,
        firstname,
        lastname,
        designation,
        department
        
    });

    newMaintainer.save()
        .then(()=>res.json(' New Maintainer Added Success! '))
        .catch(err => res.status(400).json('Error : '+err));

});



router.route('/:id').get((req,res)=>{
    Maintainer.findById(req.params.id)
        .then (maintainer =>res.json(maintainer))
        .catch(err=>res.status(400).json('Error : '+err));
});

router.route('/:id').delete((req,res)=>{
    Maintainer.findByIdAndDelete(req.params.id)
        .then (() =>res.json('Maintainer deleted. '))
        .catch(err=>res.status(400).json('Error : '+err));
});



router.route('/:id').put((req, res) => {
    Maintainer.findById(req.params.id)
      .then(maintainers => {

        maintainers.EmpId = req.body.EmpId;
        maintainers.firstname = req.body.firstname;
        maintainers.lastname = req.body.lastname;
        maintainers.designation = req.body.designation;
        maintainers.department = req.body.department;
    

        maintainers.save()
          .then(() => res.json('Maintainer details updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });



module.exports = router;