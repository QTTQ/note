const host = 'http://v3.wufazhuce.com:8000'
const wxRequest = (params, url) => {
    wx.showToast({
        title: '加载中',
        icon: 'loading'
    })
    wx.request({
        url: url,
        method: params.method || 'GET',
        data: params.data || {},
        header: {
            'Content-Type': 'application/json'
        },
        success: (res) => {
            params.success && params.success(res)
            wx.hideToast()
        },
        fail: (res) => {
            params.fail && params.fail(res)
        },
        complete: (res) => {
            params.complete && params.complete(res)
        }
    })
}

// Index
const getVolById = (params) => wxRequest(params, host + '/api/hp/detail/' + params.query.id)
const getVolIdList = (params) => wxRequest(params, host + '/api/hp/idlist/0')
const getVolsByMonth = (params) => wxRequest(params, host + '/api/hp/bymonth/' + params.query.month)
const getVolDetailById = (params) => wxRequest(params, host + '/api/hp/detail/' + params.query.id)

// Reading
const getCarousel = (params) => wxRequest(params, host + '/api/reading/carousel')
const getLastArticles = (params) => wxRequest(params, host + '/api/reading/index')
const getEssayById = (params) => wxRequest(params, host + '/api/essay/' + params.query.id)
const getSerialById = (params) => wxRequest(params, host + '/api/serialcontent/' + params.query.id)
const getQuestionById = (params) => wxRequest(params, host + '/api/question/' + params.query.id)
const getArticlesByMonth = (params) => {
    wxRequest(params, host + '/api/' + params.query.type + '/bymonth/' + params.query.month)
}

// Music
const getMusicIdList = (params) => wxRequest(params, host + '/api/music/idlist/0')
const getMusicsByMonth = (params) => wxRequest(params, host + '/api/music/bymonth/' + params.query.month)
const getMusicDetailById = (params) => wxRequest(params, host + '/api/music/detail/' + params.query.id)

// Movie
const getMovieListById = (params) => wxRequest(params, host + '/api/movie/list/' + params.query.id)
const getMovieDetailById = (params) => wxRequest(params, host + '/api/movie/detail/' + params.query.id)
const getMovieStoryById = (params) => wxRequest(params, host + '/api/movie/' + params.query.id + '/story/1/0')

module.exports = {
    getVolById,
    getVolIdList,
    getVolsByMonth,
    getVolDetailById,
    getCarousel,
    getLastArticles,
    getEssayById,
    getSerialById,
    getQuestionById,
    getArticlesByMonth,
    getMusicIdList,
    getMusicsByMonth,
    getMusicDetailById,
    getMovieListById,
    getMovieDetailById,
    getMovieStoryById
}
// =====================================================
const apiURL = 'http://api.breadtrip.com';

const wxRequest = (params, url) => {
    wx.request({
        url,
        method: params.method || 'GET',
        data: params.data || {},
        header: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        success(res) {
            if (params.success) {
                params.success(res);
            }
        },
        fail(res) {
            if (params.fail) {
                params.fail(res);
            }
        },
        complete(res) {
            if (params.complete) {
                params.complete(res);
            }
        },
    });
};

const getHotTripList = (params) => {
    wxRequest(params, `${apiURL}/v2/index/`);
};
const getExplorePlaceList = (params) => {
    wxRequest(params, `${apiURL}/destination/v3/`);
};
const getPlaceInfoByID = (params) => {
    wxRequest(params, `${apiURL}/destination/place/${params.query.type}/${params.query.id}/`);
};
const getPlacePOIByID = (params) => {
    wxRequest(params, `${apiURL}/destination/place/${params.query.type}/${params.query.id}/pois/${params.query.poiType}/`);
};
const getTripInfoByID = (params) => {
    wxRequest(params, `${apiURL}/trips/${params.query.tripId}/waypoints/`);
};
const getPlaceTripByID = (params) => {
    wxRequest(params, `${apiURL}/destination/place/${params.query.type}/${params.query.id}/trips/`);
};
const getUserInfoByID = (params) => {
    wxRequest(params, `${apiURL}/users/${params.query.userId}/v2`);
};
const getWaypointInfoByID = (params) => {
    wxRequest(params, `${apiURL}/trips/${params.query.tripId}/waypoints/${params.query.waypointId}/`);
};
const getWaypointReplyByID = (params) => {
    wxRequest(params, `${apiURL}/trips/${params.query.tripId}/waypoints/${params.query.waypointId}/replies/`);
};

module.exports = {
    getHotTripList,
    getExplorePlaceList,
    getPlaceInfoByID,
    getPlacePOIByID,
    getTripInfoByID,
    getPlaceTripByID,
    getUserInfoByID,
    getWaypointInfoByID,
    getWaypointReplyByID,
};
