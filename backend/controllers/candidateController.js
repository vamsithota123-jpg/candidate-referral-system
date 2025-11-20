const Candidate = require('../models/Candidate');
const { validationResult } = require('express-validator');

exports.createCandidate = async (req, res) => {
const errors = validationResult(req);
if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

try {
const { name, email, phone, jobTitle } = req.body;
const resumeUrl = req.file ? `/uploads/${req.file.filename}` : undefined;


const candidate = new Candidate({ name, email, phone, jobTitle, resumeUrl });
await candidate.save();
res.status(201).json(candidate);
} catch (err) {
console.error(err);
if (err.code === 11000) return res.status(400).json({ error: 'Email must be unique' });
res.status(500).json({ error: 'Server error' });
}
};

exports.getCandidates = async (req, res) => {
try {
const candidates = await Candidate.find().sort({ createdAt: -1 });
res.json(candidates);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Server error' });
}
};

exports.updateStatus = async (req, res) => {
try {
const { id } = req.params;
const { status } = req.body;
if (!['Pending', 'Reviewed', 'Hired'].includes(status)) {
return res.status(400).json({ error: 'Invalid status' });
}
const candidate = await Candidate.findByIdAndUpdate(id, { status }, { new: true });
if (!candidate) return res.status(404).json({ error: 'Candidate not found' });
res.json(candidate);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Server error' });
}
};

exports.deleteCandidate = async (req, res) => {
try {
const candidate = await Candidate.findByIdAndDelete(req.params.id);
if (!candidate) return res.status(404).json({ error: 'Candidate not found' });
res.json({ message: 'Deleted' });
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Server error' });
}
};

exports.getMetrics = async (req, res) => {
try {
const total = await Candidate.countDocuments();
const pending = await Candidate.countDocuments({ status: 'Pending' });
const reviewed = await Candidate.countDocuments({ status: 'Reviewed' });
const hired = await Candidate.countDocuments({ status: 'Hired' });
res.json({ total, pending, reviewed, hired });
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Server error' });
}
};