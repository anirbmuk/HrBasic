define(['ojs/ojcore', 'knockout', 'jquery', 'crud/departmentvm', 'common/utils/tableutils', 'common/utils/messageutils', 'ojs/ojknockout-model',
        'common/composites/hr-table/loader', 'ojs/ojinputtext', 'ojs/ojlabel', 'ojs/ojbutton', 'ojs/ojtable',
        'ojs/ojpagingtabledatasource', 'ojs/ojarraytabledatasource', 'ojs/ojcollectiontabledatasource'],
        (oj, ko, $, department, tableutils, messageutils) => {

    function DepartmentViewModel() {
        const self = this;

        self.heading = 'Departments';
        
        self.departmentNameHelpDef = 'Enter department name to search';
        self.departmentNameHelpDefHelpSource = `https://www.oracle.com/`;
        self.isDepartmentNameRequired = false;
        self.departmentNameInput = ko.observable();

        self.pagingDatasource = ko.observable(new oj.PagingTableDataSource(new oj.ArrayTableDataSource([])));
        
        self.DepartmentData = ko.observable();

        self.departmentColumns = department.departmentColumns;
        self.departmentParams = ko.observable(department.departmentParams);
        
        self.selected = ko.observable();
        self.selectionType = { row: 'single' };
        
        // Create and edit feature
        self.mDepartmentId = ko.observable('');
        self.mDepartmentName = ko.observable('');
        self.mLocationId = ko.observable('');
        self.mManagerId = ko.observable('');
        self.modalType = ko.observable('E');
        self.modalHeader = ko.computed(() => self.modalType() === 'E' ? 'Edit' : 'Create');
        
        self.confirmationMessageTimeout = ko.observable('3000');
        self.errorMessageTimeout = ko.observable('5000');
        
        self.messages = ko.observableArray([]);
        self.messagesDataprovider = messageutils.messagesDataprovider(self.messages);
        
        self.currentDepartment = ko.computed(() => {
            return {
                "DepartmentId": self.mDepartmentId(),
                "DepartmentName": self.mDepartmentName(),
                "LocationId": self.mLocationId(),
                "ManagerId": self.mManagerId()
            };
        });
        
        self.departmentParams = {
            limit: 5,
            pageSize: 5,
            totalResults: true,
            onlyData: true,
            finder: 'SearchDepartments',
            expand: true,
            child: 'EmployeesVO'
        };

        self.departmentSearch = function () {
            const departmentSearchObject = [{ key: 'Bind_departmentname', value: self.departmentNameInput() }];
            self.DepartmentData(department.getDepartmentCollection(departmentSearchObject, self.departmentParams));
            console.log('departments', self.DepartmentData());
            self.pagingDatasource(new oj.PagingTableDataSource(new oj.CollectionTableDataSource(self.DepartmentData())));
        };
        
        self.departmentSelection = function(event, table) {
            self.selected('');
            Promise.all(tableutils.getSelectionData(table, event, self.pagingDatasource())).then(selectionData => {
                let arr = [];
                for (var i=0; i<selectionData.length; i++) {
                    const { DepartmentId, DepartmentName, LocationId, ManagerId } = selectionData[i]['data'];
                    arr.push([ DepartmentId, DepartmentName, LocationId, ManagerId ].join(', '));
                    self.loadEditScreen({
                        DepartmentId, DepartmentName, LocationId, ManagerId
                    });
                    self.modalType('E');
                    $('#crudmodal')[0].open();
                }
                self.selected(arr.join(' | '));
               
            }).catch(err => console.log(err));
        };
        
        self.departmentCreate = function() {
            self.modalType('C');
            $('#crudmodal')[0].open();
        };
        
        self.updateDepartment = function() {
            const currentDepartment = self.currentDepartment();
            const model = department.getDepartmentModel();
            model.id = self.mDepartmentId();

            model.fetch({
                success: function(departmentModel) {
                    self.saveModel(currentDepartment, departmentModel);
                },
                error: function(err) {
                    console.log(err);
                }
            });
        };
        
        self.createDepartment = function() {
            const currentDepartment = self.currentDepartment();
            const departmentSearchObject = [{ key: 'Bind_departmentname', value: self.departmentNameInput() }];
            self.DepartmentData(department.getDepartmentCollection(departmentSearchObject, self.departmentParams));
            
            self.DepartmentData().create(currentDepartment, {
                contentType: "application/vnd.oracle.adf.resourceitem+json",
                success: function (response) {
                    self.onDialogCancel();
                    self.messages(messageutils.buildMessage('confirmation', {
                            msgSummary: 'Success',
                            msgDetail: 'One department created'
                    }, self.confirmationMessageTimeout()));
                     self.pagingDatasource(new oj.PagingTableDataSource(new oj.CollectionTableDataSource(self.DepartmentData())));
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    self.onDialogCancel();
                    self.messages(messageutils.buildMessage('error', {
                            msgSummary: 'Failed to create department',
                            msgDetail: jqXHR.responseText
                    }, self.confirmationMessageTimeout()));
                }
            });
        };
        
        self.saveModel = function(currentDepartment, departmentModel) {
            departmentModel.save({ "DepartmentName" : currentDepartment.DepartmentName }, {
                contentType: 'application/vnd.oracle.adf.resourceitem+json',
                patch: 'patch',
                success: function (response) {
                    self.onDialogCancel();
                    self.messages(messageutils.buildMessage('confirmation', {
                            msgSummary: 'Success',
                            msgDetail: 'One department updated'
                    }, self.confirmationMessageTimeout()));
                    self.pagingDatasource(new oj.PagingTableDataSource(new oj.CollectionTableDataSource(self.DepartmentData())));
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    self.onDialogCancel();
                    self.messages(messageutils.buildMessage('error', {
                            msgSummary: 'Failed to update department',
                            msgDetail: jqXHR.responseText
                    }, self.confirmationMessageTimeout()));
                }
            });
        };
        
        self.onDialogOk = function(evt) {
            const departmentCollection = self.DepartmentData();
            if (self.modalType() === 'C') {
                self.createDepartment();
            } else {
                self.updateDepartment();
            }
        };
        
        self.onDialogCancel = function(evt) {
            self.loadEditScreen({
                DepartmentId: '', DepartmentName: '', LocationId: '', ManagerId: ''
            });
            $('#crudmodal')[0].close();
        };
        
        self.loadEditScreen = function(data) {
            self.mDepartmentId(data.DepartmentId);
            self.mDepartmentName(data.DepartmentName);
            self.mLocationId(data.LocationId);
            self.mManagerId(data.ManagerId);
        };

    };

    return new DepartmentViewModel();

});