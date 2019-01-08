define(['data/urlhelper', 'crud/crudmodel'], function(urlhelper, crud) {
    
    getLocUrl = function(locationInput) {
        return urlhelper.getUrl('locations', locationInput, locationParams);
    };
    
    parseLoc = function(response) {
        return {
            'City': response.City,
            'StateProvince': response.StateProvince,
            'PostalCode': response.PostalCode,
            'CountryId': response.CountryId
        };
    };
    
    // Location Model
    getLocationModel = function() {
        const LocationModel = crud.getModel({
            urlRoot: getBaseUrl(),
            parse: parseLoc,
            idAttribute: 'City'
        });
        return new LocationModel();
    };
    
    // Location Collection
    getLocationCollection = function(locationInput) {
        const LocationCollection = crud.getCollection({
            url: getLocUrl(locationInput),
            fetchSize: locationParams.limit,
            model: getLocationModel(locationInput)
        });
        return new LocationCollection();
    };
    
    const locationParams = {
        limit: 5,
        pageSize: 5,
        totalResults: true,
        onlyData: true,
        finder: 'SearchLocations'
    };
    
    const locationColumns = [{"headerText": "City",  "renderer": oj.KnockoutTemplateUtils.getRenderer("loc_name", true), },
            {"headerText": "State/Province", "field": "StateProvince"},
            {"headerText": "Postal Code", "field": "PostalCode"}];
    
    return {
        locationParams,
        locationColumns,
        getLocationCollection
    };
    
});


