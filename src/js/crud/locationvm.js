define(['data/urlhelper', 'crud/crudmodel'], function(urlhelper, crud) {
    
    function getUrl(locationInput, locationParams) {
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
    function getLocationCollection(locationInput, locationParams) {
        const LocationCollection = crud.getCollection({
            url: getUrl(locationInput, locationParams),
            fetchSize: locationParams.limit,
            model: getLocationModel(locationInput)
        });
        return new LocationCollection();
    };
    
    const locationColumns = [{"headerText": "City",  "renderer": oj.KnockoutTemplateUtils.getRenderer("loc_name", true) },
            {"headerText": "State/Province", "field": "StateProvince"},
            {"headerText": "Postal Code", "field": "PostalCode"}];
    
    return {
        locationColumns,
        getLocationCollection
    };
    
});


