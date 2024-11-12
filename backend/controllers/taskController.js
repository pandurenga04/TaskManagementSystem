const Task = require('../models/Task');

const createTask = async (req, res) => {
    const newTask = new Task(req.body);
    try {
        await newTask.save();
        res.status(201).json({ message: 'Task created successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateTask = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        await Task.findByIdAndDelete(id);
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };
