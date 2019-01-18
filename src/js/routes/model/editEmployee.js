define(['ojs/ojcore', 'knockout', 'jquery', 'crud/employeevm', 'common/utils/messageutils', 'common/utils/dateutils',
       'ojs/ojinputnumber', 'ojs/ojdatetimepicker', 'ojs/ojvalidationgroup'],
function(oj, ko, $, emp, messageutils, dateutils) {
    
    function EditEmployeeModel() {
        
        const self = this;
        
        self.heading = ko.observable();
        self.viewMode = ko.observable();
        self.displayId = ko.observable(false);
        
        self.EmployeeModel = ko.observable();
        self.EmployeeData = ko.observable();
        
        self.routeInstance = ko.observable();
        self.messages = ko.observableArray([]);
        self.messagesDataprovider = messageutils.messagesDataprovider(self.messages);
        
        self.confirmationMessageTimeout = ko.observable('3000');
        self.errorMessageTimeout = ko.observable('5000');
        
        self.dateConverter = ko.observable(dateutils.getConverter('dd-MMM-yyyy'));
        
        self.employeeValid = ko.observable();
        
        self.init = function() {
            
            self.viewMode('edit');
            self.routeInstance(oj.Router.rootInstance);
            self.messages([]);
            
            const routeData = self.routeInstance().retrieve();
            self.heading(`Edit employee ${routeData.employeeId}`);
            
            const { mode, employeeId } = routeData;
            
            if(mode) {
                if (mode === 'edit') {
                    if (!employeeId) {
                        oj.Router.rootInstance.go("employee");
                        return false;
                    }
                    self.heading(`Edit employee ${routeData.employeeId}`);
                } else {
                    self.viewMode('create');
                    self.heading(`Create employee`);
                }
            } else {
                oj.Router.rootInstance.go("employee");
            }
            
            self.displayId(self.viewMode() === 'create');
            
            let model = emp.getEmployeeModel();
            
            if (self.viewMode() === 'edit') {
                model.id = employeeId;

                model.fetch({
                    success: function(employeeModel) {
                        self.EmployeeModel(employeeModel);
                    },
                    error: function(err) {
                        console.log(err);
                    }
                });
            } else {
                self.EmployeeData(emp.getEmployeeCollection());
                self.EmployeeModel(model);
            }
            
        };
        
        self.validators = [
            {
                
            }
        ];
        
        self.cancelTransaction = function() {
            self.routeInstance().store();
            self.routeInstance().go("employee");
        };
        
        self.refreshTransaction = function(edited) {
            self.routeInstance().store({
                edited
            });
            self.routeInstance().go("employee");
        };
        
        self.createEmployee = function(collection, employee) {
            collection.create(employee, {
                contentType: 'application/vnd.oracle.adf.resourceitem+json',
                success: function (response) {
                    self.messages(messageutils.buildMessage('confirmation', {
                            msgSummary: 'Success',
                            msgDetail: 'One employee created'
                    }, self.confirmationMessageTimeout()));
                    setTimeout(function() {
                        self.refreshTransaction(true);
                    }, self.confirmationMessageTimeout());
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    self.messages(messageutils.buildMessage('error', {
                            msgSummary: 'Failed to create employee',
                            msgDetail: jqXHR.responseText
                    }, self.confirmationMessageTimeout()));
                }
            });
        };
        
        self.editEmployee = function(collection, employee) {
            collection.save(employee, {
                contentType: 'application/vnd.oracle.adf.resourceitem+json',
                patch: 'patch',
                success: function (response) {
                    self.messages(messageutils.buildMessage('confirmation', {
                            msgSummary: 'Success',
                            msgDetail: 'One employee updated'
                    }, self.confirmationMessageTimeout()));
                    setTimeout(function() {
                        self.refreshTransaction(true);
                    }, self.confirmationMessageTimeout());
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    self.messages(messageutils.buildMessage('error', {
                            msgSummary: 'Error',
                            msgDetail: jqXHR.responseText 
                    }, self.confirmationMessageTimeout()));
                }
            });
        };
        
        self.saveTransaction = function() {
            const tracker = $("#tracker")[0];
            if (tracker && tracker.valid === 'valid') {
                const employee = self.EmployeeModel().attributes;
                let collection;
                if (self.viewMode() === 'create') {
                    collection = self.EmployeeData();
                    self.createEmployee(collection, employee);
                } else {
                    collection = self.EmployeeModel();
                    self.editEmployee(collection, employee);
                }
            } else {
                tracker.showMessages();
                tracker.focusOn("@firstInvalidShown");
            }
        };
        
    };
    
    return new EditEmployeeModel();
    
});