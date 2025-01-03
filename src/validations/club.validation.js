const Joi = require("joi");

const getClubs = {
    query: Joi.object().keys({
        name: Joi.string().allow(''),
        cityId: Joi.string().allow(''),
        search: Joi.object()
            .pattern(
                Joi.string(),
                Joi.string().allow('')
            )
            .optional(),
        sortBy: Joi.string(),
        sortType: Joi.string().allow(''),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const getClub = {
    query: Joi.object().keys({
        id: Joi.number()
    }),
};

module.exports = {
    getClubs,
    getClub
};