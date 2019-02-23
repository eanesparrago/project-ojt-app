const Department = require("../models/department");
const { validationResult } = require("express-validator/check");

function testRoute(req, res) {
  res.status(200).json({ message: "Departments test" });
}

/**
 * Get all departments
 * @route   GET api/departments
 * @access  private (role: administrator)
 */
function getDepartments(req, res) {
  const errors = {};

  Department.find()
    .then(departments => {
      if (!departments) {
        errors.departments = "There are no departments";
        return res.status(404).json(errors);
      }

      res.json(departments);
    })
    .catch(err => {
      console.log(err);
    });
}

/**
 * Create a department
 * @route   POST api/departments
 * @param   {Object}  req.body.name (required)
 * @param   {string}  req.body.location
 * @param   {string}  req.body.phoneNumber
 * @access  private   (role: administrator)
 */
function createDepartment(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const newDepartment = new Department({
    name: req.body.name,
    location: req.body.location,
    phoneNumber: req.body.phoneNumber
  });

  Department.findOne({ name: req.body.name }).then(department => {
    if (department) {
      errors.department = "Department already exists";
      return res.status(400).json(errors);
    }
  });

  newDepartment
    .save()
    .then(department => res.status(201).json(department))
    .catch(err => console.log(err));
}

module.exports = {
  testRoute,
  createDepartment,
  getDepartments
};
