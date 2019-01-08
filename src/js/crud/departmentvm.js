define(['data/urlhelper', 'crud/crudmodel'], function(urlhelper, crud) {
    
    getUrl = function(departmentInput) {
        return urlhelper.getUrl('departments', departmentInput, departmentParams);
    };
    
    getBaseUrl = function() {
        return urlhelper.getBaseUrl('departments');
    };
    
    parseDept = function(response) {
        return {
            'DepartmentId': response.DepartmentId,
            'DepartmentName': response.DepartmentName,
            'LocationId': response.LocationId,
            'ManagerId': response.ManagerId
        };
    };
    
    // Department Model
    getDepartmentModel = function() {
        const DepartmentModel = crud.getModel({
            urlRoot: this.getBaseUrl(),
            parse: parseDept,
            parseSave: parseDept,
            idAttribute: 'DepartmentId'
        });
        return new DepartmentModel();
    };
    
    // Department Collection
    getDepartmentCollection = function(departmentInput) {
        const DepartmentCollection = crud.getCollection({
            url: getUrl(departmentInput),
            fetchSize: departmentParams.limit,
            model: getDepartmentModel()
        });
        return new DepartmentCollection();
    };
    
    const departmentParams = {
        limit: 5,
        pageSize: 5,
        totalResults: true,
        onlyData: true,
        finder: 'SearchDepartments'
    };
    
//    const departmentColumns = [{"headerText": "Department", "renderer": oj.KnockoutTemplateUtils.getRenderer("dept_name", true) },
//            {"headerText": "Location Id", "field": "LocationId"},
//            {"headerText": "ManagerId", "field": "ManagerId"}];

    const departmentColumns = [{"headerText": "Department Id", "field": "DepartmentId" },
            {"headerText": "Department Name", "field": "DepartmentName" },
            {"headerText": "Location Id", "field": "LocationId"},
            {"headerText": "Manager Id", "field": "ManagerId"}];
    
    return {
        departmentParams,
        departmentColumns,
        getDepartmentModel,
        getDepartmentCollection
    };
    
});