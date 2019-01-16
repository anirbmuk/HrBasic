define(['ojs/ojcore', 'knockout', 'jquery', 'crud/employeevm', 'common/utils/dateutils',
        'ojs/ojbutton', 'ojs/ojpagingcontrol', 'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource', 'ojs/ojcollectiontabledatasource'],
(oj, ko, $, emp, dateutils) => {
    
    function EmployeeViewModel() {
        const self = this;
        
        self.heading = 'Employees';
        
        self.initialized = ko.observable(false);
        
        self.selectionType = { row: 'none', column: 'none' };
        self.EmployeeData = ko.observable();
        self.employeeColumns = emp.employeeActionColumns;
        self.employeeParams = ko.observable(emp.employeeParams);
        self.pagingDatasource = ko.observable(new oj.PagingTableDataSource(new oj.ArrayTableDataSource([])));
        
        self.init = function() {
            const initialized = self.initialized();
            
            const routerParams = oj.Router.rootInstance.retrieve();
            const edited = (routerParams ? (routerParams.edited ? routerParams.edited : false) : false);
            
            if (!initialized || edited) {
                self.EmployeeData(emp.getEmployeeCollection());
                self.pagingDatasource(new oj.PagingTableDataSource(new oj.CollectionTableDataSource(self.EmployeeData())));
                self.initialized(true);
            }
            
            oj.Router.rootInstance.store();
        };
        
        self.getStringFromDate = function(date, format) {
            return dateutils.getStringFromDate(date, format);
        };
        
        self.createEmployee = function() {
            oj.Router.rootInstance.store({
                mode: 'create',
                employeeId: null
            });
            oj.Router.rootInstance.go("editEmployee");
        };
        
        self.editEmployee = function(employeeId) {
            oj.Router.rootInstance.store({
                mode: 'edit',
                employeeId
            });
            oj.Router.rootInstance.go("editEmployee");
        };
        
        self.deleteEmployee = function(employeeId) {
            const model = emp.getEmployeeModel();
            model.id = employeeId;
            self.EmployeeData().get(model).then(employeeModel => {
                employeeModel.destroy({ wait: true });
                self.EmployeeData(emp.getEmployeeCollection());
                self.pagingDatasource(new oj.PagingTableDataSource(new oj.CollectionTableDataSource(self.EmployeeData())));
            });
        };
        
    };
    
    return new EmployeeViewModel();
    
});

