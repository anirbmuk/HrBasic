define(['data/urlhelper', 'crud/crudmodel'], function(urlhelper, crud) {
    
    function getUrl(locationInput) {
        return urlhelper.getUrl('locations', locationInput, locationParams);
    };
    
    function getBaseUrl() {
        return urlhelper.getBaseUrl('locations', null, null);
    };
    
    function parseLoc(response) {
        return {
            'City': response.City,
            'StateProvince': response.StateProvince,
            'PostalCode': response.PostalCode,
            'CountryId': response.CountryId
        };
    };
    
    // Location Model
    function getLocationModel() {
        const LocationModel = crud.getModel({
            urlRoot: getBaseUrl(),
            parse: parseLoc,
            idAttribute: 'City'
        });
        return new LocationModel();
    };
    
    // Location Collection
    function getLocationCollection(locationInput) {
        const LocationCollection = crud.getCollection({
            url: getUrl(locationInput),
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
        finder: 'SearchLocations',
        expand: false
    };
    
    const locationColumns = [{"headerText": "City",  "renderer": oj.KnockoutTemplateUtils.getRenderer("loc_name", true) },
            {"headerText": "State/Province", "field": "StateProvince"},
            {"headerText": "Postal Code", "field": "PostalCode"}];
    
    return {
        locationParams,
        locationColumns,
        getLocationCollection
    };
    
});


