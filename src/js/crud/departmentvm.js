define(['data/urlhelper', 'crud/crudmodel'], function(urlhelper, crud) {
    
    function getUrl(departmentInput) {
        return urlhelper.getUrl('departments', departmentInput, departmentParams);
    };
    
    function getBaseUrl() {
        return urlhelper.getBaseUrl('departments', departmentParams.expand, departmentParams.child);
    };
    
    parseDept = function(response) {
        return {
            'DepartmentId': response.DepartmentId,
            'DepartmentName': response.DepartmentName,
            'LocationId': response.LocationId,
            'ManagerId': response.ManagerId,
            'EmployeesVO': response.EmployeesVO
        };
    };
    
    // Department Model
    function getDepartmentModel() {
        const DepartmentModel = crud.getModel({
            urlRoot: getBaseUrl(),
            parse: parseDept,
            parseSave: parseDept,
            idAttribute: 'DepartmentId'
        });
        return new DepartmentModel();
    };
    
    // Department Collection
    function getDepartmentCollection(departmentInput) {
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
        onlyData: false,
        finder: 'SearchDepartments',
        expand: true,
        child: 'EmployeesVO'
    };
    
//    const departmentColumns = [{"headerText": "Department", "renderer": oj.KnockoutTemplateUtils.getRenderer("dept_name", true) },
//            {"headerText": "Location Id", "field": "LocationId"},
//            {"headerText": "ManagerId", "field": "ManagerId"}];

    const departmentColumns = [{"headerText": "Id", "field": "DepartmentId" },
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