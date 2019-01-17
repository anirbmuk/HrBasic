define(['data/urlhelper', 'crud/crudmodel'], function(urlhelper, crud) {
    
    function getUrl() {
        return urlhelper.getUrl('employeesauth', null, employeeParams);
    };
    
    function getBaseUrl() {
        return urlhelper.getBaseUrl('employeesauth', null, null);
    };
    
    function getChildAccessorCollection(url) {
        const EmployeeCollection = crud.getCollection({
            url,
            fetchSize: employeeParams.limit,
            model: getEmployeeModel()
        });
        return new EmployeeCollection();
    }
    
    function parseEmpl(response) {
        return {
            'EmployeeId': response.EmployeeId,
            'FirstName': response.FirstName,
            'LastName': response.LastName,
            'Email': response.Email,
            'JobId': response.JobId,
            'HireDate': response.HireDate,
            'Salary': response.Salary,
            'DepartmentId': response.DepartmentId
        };
    };
    
    // Employee Model
    function getEmployeeModel() {
        const EmployeeModel = crud.getModel({
            urlRoot: getBaseUrl(),
            parse: parseEmpl,
            parseSave: parseEmpl,
            idAttribute: 'EmployeeId'
        });
        return new EmployeeModel();
    };
    
    // Employee Collection
    function getEmployeeCollection() {
        const EmployeeCollection = crud.getCollection({
            url: getUrl(),
            fetchSize: employeeParams.limit,
            model: getEmployeeModel()
        });
        return new EmployeeCollection();
    };
    
    const employeeParams = {
        limit: 5,
        pageSize: 5,
        totalResults: true,
        onlyData: true,
        expand: false
    };
    
//    const departmentColumns = [{"headerText": "Department", "renderer": oj.KnockoutTemplateUtils.getRenderer("dept_name", true) },
//            {"headerText": "Location Id", "field": "LocationId"},
//            {"headerText": "ManagerId", "field": "ManagerId"}];

    const employeeActionColumns = [{"headerText": "Id", "field": "EmployeeId" },
            { "headerText": "First Name", "field": "FirstName" },
            { "headerText": "Last Name", "field": "LastName"},
            { "headerText": "Email", "field": "Email"},
            { "headerText": "Job Id", "field": "JobId"},
            { "headerText": "Salary", "field": "Salary"},
            { "headerText": "Hired On", "renderer": oj.KnockoutTemplateUtils.getRenderer("empl_date", true)},
            { "headerText": "Department", "field": "DepartmentId"},
            { "headerText": "Actions", "renderer": oj.KnockoutTemplateUtils.getRenderer("empl_ops", true) }];
        
    const employeeColumns = [{"headerText": "Id", "field": "EmployeeId" },
            { "headerText": "First Name", "field": "FirstName" },
            { "headerText": "Last Name", "field": "LastName"},
            { "headerText": "Email", "field": "Email"},
            { "headerText": "Job Id", "field": "JobId"},
            { "headerText": "Salary", "field": "Salary"},
            { "headerText": "Department", "field": "DepartmentId"}];
    
    return {
        employeeParams,
        employeeColumns,
        employeeActionColumns,
        getEmployeeModel,
        getEmployeeCollection,
        getChildAccessorCollection
    };
    
});