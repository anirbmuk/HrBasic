define(['data/urlhelper', 'crud/crudmodel'], function(urlhelper, crud) {
    
    getCustomUrl = function() {
        return urlhelper.getUrl('employeesauth', null, employeeParams);
    };
    
    getBaseUrl = function() {
        return urlhelper.getBaseUrl('employeesauth');
    };
    
    parseEmpl = function(response) {
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
    getEmployeeModel = function() {
        const EmployeeModel = crud.getModel({
            urlRoot: getBaseUrl(),
            parse: parseEmpl,
            parseSave: parseEmpl,
            idAttribute: 'EmployeeId'
        });
        return new EmployeeModel();
    };
    
    // Employee Collection
    getEmployeeCollection = function() {
        const EmployeeCollection = crud.getCollection({
            url: getCustomUrl(),
            fetchSize: employeeParams.limit,
            model: getEmployeeModel()
        });
        return new EmployeeCollection();
    };
    
    const employeeParams = {
        limit: 6,
        pageSize: 6,
        totalResults: true,
        onlyData: true
    };
    
//    const departmentColumns = [{"headerText": "Department", "renderer": oj.KnockoutTemplateUtils.getRenderer("dept_name", true) },
//            {"headerText": "Location Id", "field": "LocationId"},
//            {"headerText": "ManagerId", "field": "ManagerId"}];

    const employeeColumns = [{"headerText": "Employee Id", "field": "EmployeeId" },
            { "headerText": "First Name", "field": "FirstName" },
            { "headerText": "Last Name", "field": "LastName"},
            { "headerText": "Email", "field": "Email"},
            { "headerText": "Job Id", "field": "JobId"},
            { "headerText": "Salary", "field": "Salary"},
            { "headerText": "Hired On", "renderer": oj.KnockoutTemplateUtils.getRenderer("empl_date", true)},
            { "headerText": "Department", "field": "DepartmentId"},
            { "headerText": "Actions", "renderer": oj.KnockoutTemplateUtils.getRenderer("empl_ops", true) }];
    
    return {
        employeeParams,
        employeeColumns,
        getEmployeeModel,
        getEmployeeCollection
    };
    
});