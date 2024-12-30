const { User, UserRole } = require("@prisma/client");
const httpStatus = require("http-status");
const prisma = require("../client");
const ApiError = require("../utils/ApiError");

/**
 * Create a user file
 * @param {Object} userFileBody
 * @returns {Promise<UserFile>}
 */
const createUserFile = async (member_id, request_id, title, description, file_type_id, file_base_url, file_base_path, file_name, file_extention, status = 1) => {
    return prisma.UserFile.create({
        data: {
            member_id,
            request_id,
            title,
            description,
            file_type_id,
            file_base_url,
            file_base_path,
            file_name,
            file_extention,
            status,
        },
    });
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<UserFile, Key> | null>}
 */
const getUserFileById = async (
    id
) => {
    return prisma.UserFile.findUnique({
        where: { id },
    });
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<UserFile, Key> | null>}
 */
const getUserFileByUserIdAndFileTypeId = async (
    userId,
    fileTypeId,
) => {
    return prisma.UserFile.findFirst({
        where: {
            file_type_id: fileTypeId,
            member_id: userId
        }
    });
};

module.exports = {
    createUserFile,
    getUserFileById,
    getUserFileByUserIdAndFileTypeId
};
