define(['ojs/ojmodel', 'jquery'], function(oj, $) {
    
    function getModel (params) {
        return oj.Model.extend(params);
    };
    
    function getCollection(params) {
        return oj.Collection.extend(params);
    };
    
    function asyncRequest(ajaxObject) {
        if (ajaxObject) {
            return $.ajax(ajaxObject);
        }
    }
    
    function getRestData(url, data, successCallback, errorCallback) {
        const ajaxObject = {
            async: true,
            contentType: 'application/vnd.oracle.adf.resourceitem+json',
            data,
            error: errorCallback,
            success: successCallback,
            type: 'GET',
            url
        };
        return asyncRequest(ajaxObject);
    }
    
    function saveRestData(url, data, successCallback, errorCallback, type) {
        if (type && type === 'GET') {
            return getRestData(url, data, successCallback);
        }
        const ajaxObject = {
            async: true,
            contentType: 'application/vnd.oracle.adf.resourceitem+json',
            data,
            error: errorCallback,
            success: successCallback,
            type,
            url
        };
        return asyncRequest(ajaxObject);
    }
    
    return {
        getModel,
        getCollection,
        getRestData,
        saveRestData
    };
    
});