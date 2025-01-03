const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { scheduleService } = require("../services");
const ApiSuccess = require("../utils/ApiSuccess");

const getSchedules = catchAsync(async (req, res) => {
    const filter = pick(req.query, ["search", "classname", "arrival", , "companyid"]);
    const options = pick(req.query, ["sortBy", "sortType", "limit", "page"]);
    const search = req.query.search
        ? Object.fromEntries(
            Object.entries(req.query.search).filter(([key, value]) => value !== '' && value != null)
        )
        : {};
    if (Object.keys(search).length > 0) {
        filter.search = search;
    }
    const result = await scheduleService.querySchedules(filter, options);
    new ApiSuccess(res, result, "Class schedules retrieved successfully");
});

const getSchedule = catchAsync(async (req, res) => {
    const schedule = await scheduleService.getScheduleById(req.params.scheduleId);
    if (!schedule) {
        throw new ApiError(httpStatus.NOT_FOUND, "Class schedule not found");
    }
    new ApiSuccess(res, schedule, "Class schedule retrieved successfully");
});

const getDateFilter = catchAsync(async (req, res) => {
    const dateFilter = [
        {
            day: 'Today',
            date: '2025-01-02',
            date_str: '02 Jan',
        },
        {
            day: 'Fri',
            date: '2025-01-03',
            date_str: '03 Jan',
        },
        {
            day: 'Sat',
            date: '2025-01-04',
            date_str: '04 Jan',
        },
        {
            day: 'Sun',
            date: '2025-01-05',
            date_str: '05 Jan',
        },
        {
            day: 'Mon',
            date: '2025-01-06',
            date_str: '06 Jan',
        },
        {
            day: 'Tue',
            date: '2025-01-07',
            date_str: '07 Jan',
        },
        {
            day: 'Wed',
            date: '2025-01-08',
            date_str: '08 Jan',
        },
    ];
    new ApiSuccess(res, dateFilter, "Class schedule date filter retrieved successfully");
});

module.exports = {
    getSchedules,
    getSchedule,
    getDateFilter
};