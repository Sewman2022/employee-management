//backend/routes/api.js

const express = require('express');
const bcrypt = require('bcryptjs');
const Employee = require('../models/Employee');
const Project = require('../models/Project');
const ProjectAssignment = require('../models/ProjectAssignment');

const router = express.Router();

// Employee CRUD Operations
router.post('/employees', async (req, res) => {
  try {
    const { employee_id, full_name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newEmployee = new Employee({
      employee_id,
      full_name,
      email,
      hashed_password: hashedPassword
    });
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Employee by ID
router.put('/employees/:id', async (req, res) => {
  try {
    const { full_name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { full_name, email, hashed_password: hashedPassword },
      { new: true } // Returns the updated document
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Employee by ID
router.delete('/employees/:id', async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);

    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(204).json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// Project CRUD Operations
router.post('/projects', async (req, res) => {
  try {
    const { project_code, project_name, project_description } = req.body;
    const newProject = new Project({
      project_code,
      project_name,
      project_description
    });
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update Project by ID
router.put('/projects/:id', async (req, res) => {
  try {
    const { project_name, project_description } = req.body;
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { project_name, project_description },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete Project by ID
router.delete('/projects/:id', async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);

    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(204).json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Project Assignment CRUD Operations
router.post('/project-assignments', async (req, res) => {
  try {
    const { employee_id, project_code, start_date } = req.body;
    const employee = await Employee.findOne({ employee_id });
    const project = await Project.findOne({ project_code });
    const newProjectAssignment = new ProjectAssignment({
      employee_id: employee._id,
      project_code: project._id,
      start_date
    });
    const savedProjectAssignment = await newProjectAssignment.save();
    res.status(201).json(savedProjectAssignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/project-assignments', async (req, res) => {
  try {
    const projectAssignments = await ProjectAssignment.find()
      .populate('employee_id')
      .populate('project_code')
      .sort({ start_date: -1 })
      .limit(5);
    res.json(projectAssignments);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update ProjectAssignment by ID
router.put('/project-assignments/:id', async (req, res) => {
  try {
    const { start_date } = req.body;
    const updatedProjectAssignment = await ProjectAssignment.findByIdAndUpdate(
      req.params.id,
      { start_date },
      { new: true }
    );

    if (!updatedProjectAssignment) {
      return res.status(404).json({ message: 'Project Assignment not found' });
    }

    res.json(updatedProjectAssignment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete ProjectAssignment by ID
router.delete('/project-assignments/:id', async (req, res) => {
  try {
    const deletedProjectAssignment = await ProjectAssignment.findByIdAndDelete(req.params.id);

    if (!deletedProjectAssignment) {
      return res.status(404).json({ message: 'Project Assignment not found' });
    }

    res.status(204).json({ message: 'Project Assignment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
