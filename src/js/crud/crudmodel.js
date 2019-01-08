define(['ojs/ojmodel'], function(oj) {
    
    getModel = function (params) {
        return oj.Model.extend(params);
    };
    
    getCollection = function(params) {
        return oj.Collection.extend(params);
    };
    
    return {
        getModel,
        getCollection
    };
    
});