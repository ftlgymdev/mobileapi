const { GymMasterToken } = require('@prisma/client');
const httpStatus = require('http-status');
const prisma = require('../client');
const axios = require('axios');
const ApiError = require('../utils/ApiError');

/**
 * Create a token record
 * @param {number} memberId
 * @param {string} token
 * @returns {Promise<GymMasterToken>}
 */
const createToken = async (memberId, token) => {
    const existingToken = await getTokenByMemberId(memberId);
    if (existingToken) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Token already exists for this member');
    }
    return prisma.gymMasterToken.create({
        data: {
            member_id: memberId,
            token,
            expires
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
        console.log('response', response)
        if (response.data.result && response.data.result.token) {
            const memberId = response.data.result.memberid;
            const token = response.data.result.token;
            const expires = response.data.result.expires;
            await createToken(memberId, token, expires);
            return token;
        } else {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to retrieve token from GymMaster API');
        }
    } catch (error) {
        console.error('Login request failed:', error.message);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Login request failed');
    }
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
const post = async (endpoint, data = {}) => {
    try {
        data.api_key = process.env.GYMMASTER_API_KEY;
        const response = await axios.post(`${process.env.GYMMASTER_BASE_URL}${endpoint}`, data);
        return response.data || {};
    } catch (error) {
        console.error("POST Request Error:", error.message);
        return { data: [error.message] };
    }
};

const get = async (endpoint, data = {}) => {
    try {
        data.api_key = process.env.GYMMASTER_API_KEY;
        const response = await axios.get(`${process.env.GYMMASTER_BASE_URL}${endpoint}`, { params: data });
        return response.data || {};
    } catch (error) {
        console.error("GET Request Error:", error.message);
        return { data: [error.message] };
    }
};

module.exports = {
    createToken,
    getTokenByMemberId,
    getLatestToken,
    login,
    getToken,
    post,
    get
};
