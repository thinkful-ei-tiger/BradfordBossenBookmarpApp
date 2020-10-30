import $ from "jquery";
const userName = 'bFart'
const baseUrl = `https://thinkful-list-api.herokuapp.com`;

const listApiFetch = function (...args) {
    let error;
    return fetch(...args)
        .then(res=> {
            if (!res.ok) {
                error = {code: res.status};
                if(!res.headers.get('content-type').includes('json')) {
                    error.message = res.statusText;
                    return Promise.reject(error)
                }
            }
            return res.json():
        })
        .then (data => {
            if(error) {
                error.message = data.message;
                return Promise.reject(error);
            }
            return data;
        });
};
const getElements = function() {
    return listApiFetch(`${baseUrl}/${userName}/bookmarks`)
}