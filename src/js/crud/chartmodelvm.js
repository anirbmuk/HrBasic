define(['data/urlhelper', 'crud/crudmodel'], function (urlhelper, crud) {

    function getBaseUrl() {
        return urlhelper.getBaseUrl('salarydist', null, null);
    }
    
    function getSalaryDistUrl(salaryDistParams) {
        return urlhelper.getUrl('salarydist', null, salaryDistParams);
    }

    function parseSalaryDist(response) {
        return {
            'DepartmentId': response.DepartmentId,
            'DepartmentName': response.DepartmentName,
            'Salary': response.Salary
        };
    }
    
    function getSalaryDistModel() {
        const SalaryDistModel = crud.getModel({
            urlRoot: getBaseUrl(),
            parse: parseSalaryDist,
            idAttribute: 'DepartmentId'
        });
        return new SalaryDistModel();
    };
    
    function getSalaryDistCollection(salaryDistParams) {
        const SalaryDistCollection = crud.getCollection({
            url: getSalaryDistUrl(salaryDistParams),
            fetchSize: salaryDistParams.limit,
            model: getSalaryDistModel()
        });
        return new SalaryDistCollection();
    };
    
    return  {
        getSalaryDistModel,
        getSalaryDistCollection
    };

});