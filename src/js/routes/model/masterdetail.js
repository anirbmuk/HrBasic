define(['ojs/ojcore',
        'knockout',
        'jquery',
        'common/utils/tableutils',
        'crud/departmentvm',
        'crud/employeevm',
        'ojs/ojpagingtabledatasource',
        'ojs/ojarraytabledatasource',
        'ojs/ojcollectiontabledatasource'],
function(oj, ko, $, tableutils, dept, emp) {
    
    function MasterDetailController() {
        
        const self = this;
        
        self.empSelectionType = { row: 'single', column: 'none' };
        self.empData = ko.observable();
        self.empColumns = emp.employeeColumns;
        self.empDataSource = ko.observable(new oj.PagingTableDataSource(new oj.ArrayTableDataSource([])));
        self.empParams = {
            limit: 5,
            pageSize: 5,
            totalResults: true,
            onlyData: true,
            expand: false
        };
        
        self.deptSelectionType = { row: 'single', column: 'none' };
        self.deptData = ko.observable();
        self.deptColumns = dept.departmentColumns;
        self.deptDataSource = ko.observable(new oj.PagingTableDataSource(new oj.ArrayTableDataSource([])));
        self.selectedDept = ko.observable();
        self.deptParams = {
            limit: 5,
            pageSize: 5,
            totalResults: true,
            onlyData: true,
            finder: 'SearchDepartments',
            expand: true,
            child: 'EmployeesVO'
        };
        
        self.heading0 = 'Master Detail View';
        self.heading01 = 'Departments';
        self.heading02 = ko.computed(function() {
            return (self.selectedDept() ? `Employees of '${self.selectedDept()}'` : `Employees`);
        }, self);
        
        self.handleActivated = function() {
            self.fetchDepts();
            self.selectedDept('');
            self.empDataSource(new oj.PagingTableDataSource(new oj.ArrayTableDataSource([])));
        };
        
        self.fetchDepts = function() {
            const deptSearchObject = [{ key: 'Bind_departmentname', value: '' }];
            self.deptData(dept.getDepartmentCollection(deptSearchObject, self.deptParams));
            self.deptDataSource(new oj.PagingTableDataSource(new oj.CollectionTableDataSource(self.deptData())));
        };
        
        self.fetchEmps = function(childAccessorUrl) {
            const employeeAccessorCollection = emp.getChildAccessorCollection(childAccessorUrl, self.empParams);
            self.empDataSource(new oj.PagingTableDataSource(new oj.CollectionTableDataSource(employeeAccessorCollection)));
        };
        
        self.deptSelection = function(event, table) {
            Promise.all(tableutils.getSelectionData(table, event, self.deptDataSource())).then(selectionData => {
                const { DepartmentId, DepartmentName } = selectionData[0]['data'];
                self.selectedDept(DepartmentName);
                const childAccessorUrl = dept.getChildAccessorUrl('EmployeesVO', DepartmentId, self.deptParams);
                self.fetchEmps(childAccessorUrl);
            }).catch(err => console.log(err));
        };
        
        self.empSelection = function(event, table) {
            Promise.all(tableutils.getSelectionData(table, event, self.deptDataSource())).then(selectionData => {
//                let arr = [];
//                for (var i=0; i<selectionData.length; i++) {
//                    const { DepartmentId, DepartmentName, LocationId, ManagerId } = selectionData[i]['data'];
//                    arr.push([ DepartmentId, DepartmentName, LocationId, ManagerId ].join(', '));
//                }
//                console.log('Dept', arr);
               
            }).catch(err => console.log(err));
        };
        
    };
    
    return new MasterDetailController();
    
});