const generatePagination = ({ totalRecords, page, limit, path, queryParams = {} }) => {
    const totalPages = Math.ceil(totalRecords / limit);
    const buildQueryString = (additionalParams = {}) => {
        const mergedParams = { ...queryParams, ...additionalParams };
        const queryString = Object.entries(mergedParams)
            .filter(([_, value]) => value !== undefined && value !== null && value !== '')
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
        return queryString ? `?${queryString}` : '';
    };
    const firstPageUrl = `${path}${buildQueryString({ page: 1 })}`;
    const lastPageUrl = `${path}${buildQueryString({ page: totalPages })}`;
    const prevPageUrl = page > 1 ? `${path}${buildQueryString({ page: page - 1 })}` : null;
    const nextPageUrl = page < totalPages ? `${path}${buildQueryString({ page: page + 1 })}` : null;
    const links = [];
    links.push({ url: prevPageUrl, label: "&laquo; Previous", active: false });
    for (let i = 1; i <= totalPages; i++) {
        links.push({
            url: `${path}${buildQueryString({ page: i })}`,
            label: `${i}`,
            active: i === page,
        });
    }
    links.push({ url: nextPageUrl, label: "Next &raquo;", active: false });
    return {
        current_page: page,
        next_page: page + 1,
        first_page_url: firstPageUrl,
        from: (page - 1) * limit + 1,
        last_page: totalPages,
        last_page_url: lastPageUrl,
        links: links,
        next_page_url: nextPageUrl,
        path: path,
        per_page: limit,
        prev_page_url: prevPageUrl,
        to: Math.min(page * limit, totalRecords),
        total: totalRecords,
    };
};

const buildQueryString = (params) => {
    return Object.keys(params)
        .filter((key) => params[key] !== undefined && params[key] !== null)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join("&");
};

module.exports = { generatePagination };
