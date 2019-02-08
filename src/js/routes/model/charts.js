define(['ojs/ojcore',
        'knockout',
        'jquery',
        'crud/chartmodelvm',
        'crud/departmentvm',
        'crud/employeevm',
        'ojs/ojswitch',
        'ojs/ojchart',
        'ojs/ojrefresher',
        'ojs/ojbutton'],
function(oj, ko, $, chart, dept, emp) {
    
    function ChartModel() {
        
        const self = this;
        self.heading = 'Charts';
        
        self.threeDEffect = ko.observable(false);
        self.threeDValue = ko.computed(function() {
            return self.threeDEffect() ? 'on' : 'off';
        }, self);
        self.innerRadius = ko.observable(0);
        self.showChild = ko.observable(false);
        self.pieType = ko.observable('pie');
        
        self.pieSeriesValue = ko.observableArray([]);
        self.childPieSeriesValue = ko.observableArray([]);
        
        self.selectionValue = ko.observableArray([]);
        self.selectionValue.subscribe(function(selection) {
           if (selection && selection.length > 0) {
               self.showChild(true);
               self.fetchEmps(selection[0]);
           } else {
               self.showChild(false);
           }
        });
        self.pieType.subscribe(function(val) {
            console.log(val);
            self.changeChart();
        });
        
        self.salaryDistParams = {
            limit: 25,
            totalResults: true,
            onlyData: true,
            expand: false
        };
        
        self.deptParams = {
            limit: 9999,
            pageSize: 5,
            totalResults: true,
            onlyData: true,
            finder: 'SearchDepartments',
            expand: true,
            child: 'EmployeesVO'
        };
        
        self.barGroupsValue = ko.observableArray([]);
        
        const converterFactory = oj.Validation.converterFactory('number');
        self.currencyConverter = converterFactory.createConverter({style: 'currency', currency: 'USD', maximumFractionDigits: 1});
        
        self.fetchEmps = function(DepartmentId) {
            const childAccessorUrl = dept.getChildAccessorUrl('EmployeesVO', DepartmentId, self.deptParams);
            const employeeAccessorCollection = emp.getChildAccessorCollection(childAccessorUrl, self.deptParams);
            employeeAccessorCollection.fetch({
                success: self.resolveChildPieData
            });
        };
        
        self.resolvePieData = function(pieData) {
            if (pieData.models && pieData.models.length >= 0) {
                const pieArray = [];
                pieData.models.forEach(function(item) {
                   const salaryData = item.attributes;
                   const pieModel = {
                       'name': salaryData.DepartmentName,
                       'items': [{id: salaryData.DepartmentId, value: salaryData.Salary}]
                   };
                   pieArray.push(pieModel);
                });
                self.pieSeriesValue(pieArray);
            }
        };
        
        self.resolveChildPieData = function(pieData) {
            if (pieData.models && pieData.models.length >= 0) {
                const pieArray = [];
                const groupArray = [];
                pieData.models.forEach(function(item) {
                   const salaryData = item.attributes;
                   groupArray.push(salaryData.FirstName);
                   pieArray.push(salaryData.Salary);
                });
                self.childPieSeriesValue([{name: 'Salary', items: pieArray}]);
                self.barGroupsValue(groupArray);
            }
        };
        
        self.connected = function() {
            self.showChild(false);
            self.selectionValue(null);
            chart.getSalaryDistCollection(self.salaryDistParams).fetch({
                success: self.resolvePieData,
                error: function(err) {
                    console.log(err);
                    self.pieSeriesValue([]);
                }
            });
        };
        
        self.updateChart = function() {
            return new Promise(function(resolve, reject) {
                resolve(self.connected());
            });
        };
        
        self.changeChart = function() {
            $("#pieChart").fadeOut(100, function() {
                const innerRadius = self.innerRadius();
                if (innerRadius > 0) {
                    self.innerRadius(0);
                } else {
                    self.innerRadius(0.5);
                }
            });
            $("#pieChart").fadeIn(500);
        };
        
    };
    
    return new ChartModel();
    
});