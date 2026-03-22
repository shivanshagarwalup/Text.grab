const Clip = require('../models/Clip');
const { nanoid } = require('nanoid');

// @desc    Create a new clip
// @route   POST /api/clip/create
// @access  Public
exports.createClip = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ message: 'Please provide text content' });
        }

        const code = nanoid(6);

        const clip = await Clip.create({
            code,
            text
        });

        res.status(201).json({
            success: true,
            code: clip.code
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};

// @desc    Get clip by code
// @route   GET /api/clip/:code
// @access  Public
exports.getClip = async (req, res) => {
    try {
        const clip = await Clip.findOne({ code: req.params.code });

        if (!clip) {
            return res.status(404).json({
                success: false,
                message: 'Clip not found or expired'
            });
        }

        res.status(200).json({
            success: true,
            text: clip.text
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};
