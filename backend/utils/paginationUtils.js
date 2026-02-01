const getPagination = (page, limit) => {
    const currentPage = Number(page) || 1;
    const perPage = Number(limit) || 5;
    const skip = (currentPage - 1) * perPage;

    return {
        skip,
        limit: perPage,
        currentPage
    };
};

module.exports = getPagination;