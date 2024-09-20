const router = require('express').Router();
const Addorder = require('../models/addorder.model');

router.route('/').get((req, res) => {
  Addorder.find()
    .then(addorders => res.json(addorders))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/nextOrderID').get(async (req, res) => {
  try {
    const lastOrder = await Addorder.findOne().sort('-orderID');
    const nextOrderID = lastOrder && lastOrder.orderID ? lastOrder.orderID + 1 : 1;
    res.json({ nextOrderID });
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

router.route('/add').post((req, res) => {
  const { username, department, designation, date, reason, view, category, status, approval } = req.body;

  const newAddorder = new Addorder({
    username,
    department,
    designation,
    date: Date.parse(date),
    reason,
    view,
    category,
    status,
    approval
  });

  newAddorder.save()
    .then(() => res.json('New order Added Success!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Addorder.findById(req.params.id)
    .then(addorder => res.json(addorder))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Addorder.findByIdAndDelete(req.params.id)
    .then(() => res.json('Order deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').put((req, res) => {
  Addorder.findById(req.params.id)
    .then(addorder => {
      addorder.username = req.body.username;
      addorder.department = req.body.department;
      addorder.view = req.body.view;
      addorder.category = req.body.category;
      addorder.status = req.body.status;
      addorder.approval = req.body.approval;


      addorder.save()
        .then(() => res.json('Order details updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
