
exports.response = function name(params, status) {
    apidata = {};

    apidata.status = status;
    apidata.data = params;

    return apidata;
} 