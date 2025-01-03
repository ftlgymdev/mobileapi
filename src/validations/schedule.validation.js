const Joi = require("joi");

const getSchedules = {
    query: Joi.object().keys({
        companyid: Joi.string().required(),
        search: Joi.object()
            .pattern(
                Joi.string(),
                Joi.string().allow('')
            )
            .optional(),
        arrival: Joi.string().required(),
        sortBy: Joi.string(),
        sortType: Joi.string().allow(''),
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