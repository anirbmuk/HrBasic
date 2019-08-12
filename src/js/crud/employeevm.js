define(['data/urlhelper', 'crud/crudmodel'], function(urlhelper, crud) {
    
    function getUrl(employeeParams) {
        return urlhelper.getUrl('employeesauth', null, employeeParams);
    };
    
    function getBaseUrl() {
        return urlhelper.getBaseUrl('employeesauth', null, null);
    };
    
    function getChildAccessorCollection(url, employeeParams) {
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
            'PhoneNumber': response.PhoneNumber,
            'JobId': response.JobId,
            'HireDate': response.HireDate,
            'Salary': response.Salary,
            'DepartmentId': response.DepartmentId,
            'ActiveFlag': response.ActiveFlag,
            'DepartmentName': response.DepartmentName
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
    function getEmployeeCollection(employeeParams) {
        const EmployeeCollection = crud.getCollection({
            url: getUrl(employeeParams),
            fetchSize: employeeParams.limit,
            model: getEmployeeModel()
        });
        return new EmployeeCollection();
    };
    
    function getRestData(url, data, successCallback, errorCallback) {
        return crud.getRestData(url, data, successCallback, errorCallback);
    }
    
    function saveBlobData(url, data, successCallback, errorCallback) {
        return crud.saveRestData(url, data, successCallback, errorCallback, 'PATCH');
    };
    
    function getProfileImage(employeeId) {
        return `${getBaseUrl()}/${employeeId}/enclosure/ProfileImage`;
    }
    
//    const departmentColumns = [{"headerText": "Department", "renderer": oj.KnockoutTemplateUtils.getRenderer("dept_name", true) },
//            {"headerText": "Location Id", "field": "LocationId"},
//            {"headerText": "ManagerId", "field": "ManagerId"}];

    const employeeActionColumns = [{"headerText": "Id", "field": "EmployeeId" },
            { "headerText": "Employee", "renderer": oj.KnockoutTemplateUtils.getRenderer("empl_info", true)},
            { "headerText": "Email", "field": "Email"},
            { "headerText": "Phone", "field": "PhoneNumber"},
            { "headerText": "Salary", "renderer": oj.KnockoutTemplateUtils.getRenderer("empl_salary", true)},
            { "headerText": "Hired On", "renderer": oj.KnockoutTemplateUtils.getRenderer("empl_date", true)},
            { "headerText": "Actions", "renderer": oj.KnockoutTemplateUtils.getRenderer("empl_ops", true) }];
        
    const employeeColumns = [{"headerText": "Id", "field": "EmployeeId" },
            { "headerText": "First Name", "field": "FirstName" },
            { "headerText": "Last Name", "field": "LastName"},
            { "headerText": "Email", "field": "Email"},
            { "headerText": "Job Id", "field": "JobId"},
            { "headerText": "Salary", "field": "Salary"},
            { "headerText": "Department", "field": "DepartmentId"}];
    
    return {
        employeeColumns,
        employeeActionColumns,
        getEmployeeModel,
        getEmployeeCollection,
        getChildAccessorCollection,
        getRestData,
        saveBlobData,
        getProfileImage
    };
    
});