const Joi = require("joi");

const getSchedules = {
    query: Joi.object().keys({
        classname: Joi.string().allow(''),
        arrival: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const getSchedule = {
    query: Joi.object().keys({
        id: Joi.string()
    }),
};

module.exports = {
    getSchedules,
    getSchedule
};