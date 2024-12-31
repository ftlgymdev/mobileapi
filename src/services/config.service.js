const { User, UserRole } = require('@prisma/client');
const httpStatus = require('http-status');
const prisma = require('../client');
const ApiError = require('../utils/ApiError');

/**
 * Get user by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<AppConfig, Key> | null>}
 */
const getConfigById = async (id) => {
    return prisma.appConfig.findUnique({
        where: { id },
    });
};

/**
 * Get user by id
 * @param {string} platform
 * @returns {Promise<Pick<AppConfig, Key> | null>}
 */
const getConfigByPlatform = async (platform) => {
    return prisma.appConfig.findFirst({
        where: { platform }
    });
};

module.exports = {
    getConfigById,
    getConfigByPlatform
};