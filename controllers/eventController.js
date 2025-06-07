const Event = require('../models/Event');

// Get all events (public access)
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('userId', 'name email -_id');
    
    res.status(200).json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    console.error('Get all events error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Create a new event (requires authentication)
exports.createEvent = async (req, res) => {
  try {
    // Add user id to event
    req.body.userId = req.user._id;
    
    const event = await Event.create(req.body);
    
    res.status(201).json({
      success: true,
      data: event
    });
  } catch (error) {
    console.error('Create event error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get events created by logged-in user (requires authentication)
exports.getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ userId: req.user._id });
    
    res.status(200).json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    console.error('Get my events error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
}; 