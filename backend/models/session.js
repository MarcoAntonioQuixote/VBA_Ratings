const mongoose = require('mongoose');

const newSessionSchema = {
    date: 'string',
    raters: 'array',
    players: 'array',
    id: 'string',
    color: 'string',
    completed: 'boolean'
}

const Session = mongoose.model("vba-ratings", newSessionSchema);

module.exports = Session;