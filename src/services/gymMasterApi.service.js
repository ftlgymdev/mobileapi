const { GymMasterToken } = require('@prisma/client');
const httpStatus = require('http-status');
const prisma = require('../client');
const axios = require('axios');
const ApiError = require('../utils/ApiError');
const qs = require('qs');


/**
 * Create or update a token for a member
 * @param {number} memberId
 * @param {string} token
 * @param {Date} expires
 * @returns {Promise<GymMasterToken>}
 */
const createOrUpdateToken = async (memberId, token, expires) => {
    return prisma.gymMasterToken.upsert({
        where: { member_id: memberId },
        update: { token, expires },
        create: {
            member_id: memberId,
            token,
            expires,
        },
    });
};

/**
 * Get token by member ID
 * @param {number} memberId
 * @returns {Promise<GymMasterToken | null>}
 */
const getTokenByMemberId = async (memberId) => {
    return prisma.gymMasterToken.findFirst({
        where: { member_id: memberId },
    });
};

/**
 * Get member ID by token 
 * @param {string} token
 * @returns {Promise<GymMasterToken | null>}
 */
const getMemberIdByToken = async (token) => {
    return prisma.gymMasterToken.findFirst({
        where: { token },
    });
};

/**
 * Get the latest token
 * @returns {Promise<string | null>}
 */
const getLatestToken = async () => {
    const tokenRecord = await prisma.gymMasterToken.findFirst({
        orderBy: {
            created_at: 'desc',
        },
    });
    return tokenRecord ? tokenRecord.token : null;
};

/**
 * Login to GymMaster API and get token
 * @param {Object} params
 * @param {string} [params.email]
 * @param {string} [params.password]
 * @param {number} [params.memberId]
 * @returns {Promise<string>}
 */
const login = async (params) => {
    let data = { api_key: process.env.GYMMASTER_API_KEY };
    if (params.email && params.password) {
        data.email = params.email;
        data.password = params.password;
    } else if (params.memberId) {
        data.memberid = params.memberId;
    } else {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid login parameters: Provide either { email, password } or { memberId }');
    }
    try {
        const response = await axios.post(`${process.env.GYMMASTER_BASE_URL}/portal/api/v1/login`, data);
        if (response.data.result && response.data.result.token) {
            const memberId = response.data.result.memberid;
            const token = response.data.result.token;
            const expires = response.data.result.expires;
            await createOrUpdateToken(memberId, token, expires);
            if (params.email && params.password) {
                await createOrUpdateMemberPassword(memberId, data.email, data.password);
            }
            return token;
        } else {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Incorrect email or password, gmaster');
        }
    } catch (error) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, error);
    }
};

/**
 * Create a decrypt member password
 * @param {number} memberId
 * @param {string} email
 * @param {string} password
 * @returns {Promise<import('@prisma/client').DecryptPwd>}
 */
const createOrUpdateMemberPassword = async (memberId, email, password) => {
    return prisma.decryptPwd.upsert({
        where: { email },
        update: { password },
        create: {
            member_id: memberId,
            email,
            password,
        },
    });
};

/**
 * Get a token, either from the database or by logging in again
 * @returns {Promise<string>}
 */
const getToken = async () => {
    let token = await getLatestToken();
    if (!token) {
        throw new ApiError(httpStatus.NOT_FOUND, 'No token found');
    }
    return token;
};

/**
 * Send a POST request to the GymMaster API
 * @param {string} endpoint
 * @param {Object} data
 * @returns {Promise<Object>}
 */
const post = async (endpoint, data, headers = {}) => {
    try {
        const response = await axios.post(`${process.env.GYMMASTER_BASE_URL}${endpoint}`, data, { headers });
        return response.data || {};
    } catch (error) {
        if (error.response && error.response.status === 401 && error.response.data.error === 'Expired Token') {
            let parsedData = {};
            if (typeof data === 'string') {
                parsedData = qs.parse(data);
            } else if (typeof data === 'object') {
                parsedData = data;
            }
            if (parsedData.token) {
                const gymMasterToken = await getMemberIdByToken(parsedData.token);
                await login({ memberId: gymMasterToken.member_id });
                await axios.post(`${process.env.GYMMASTER_BASE_URL}${endpoint}`, data, { headers });
            }
        }
        return { error: error.message };
    }
};

const get = async (endpoint, data = {}) => {
    try {
        const response = await axios.get(`${process.env.GYMMASTER_BASE_URL}${endpoint}`, { params: data });
        return response.data || {};
    } catch (error) {
        console.error("GET Request Error:", error.message);
        return { error: error.message };
    }
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteTokenByMemberId = async (memberId) => {
    const token = await getTokenByMemberId(memberId);
    if (token) {
        await prisma.gymMasterToken.delete({ where: { member_id: token.member_id } });
    }
    return token;
};

module.exports = {
    getTokenByMemberId,
    getLatestToken,
    login,
    getToken,
    post,
    get,
    deleteTokenByMemberId
};
