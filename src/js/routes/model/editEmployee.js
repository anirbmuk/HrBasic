define(['ojs/ojcore', 'knockout', 'jquery', 'crud/employeevm', 'common/utils/messageutils', 'ojs/ojinputnumber'],
function(oj, ko, $, emp, messageutils) {
    
    function EditEmployeeModel() {
        
        const self = this;
        
        self.heading = ko.observable();
        self.employeeModel = ko.observable();
        
        self.routeInstance = ko.observable();
        self.messages = ko.observableArray([]);
        self.messagesDataprovider = messageutils.messagesDataprovider(self.messages);
        
        self.confirmationMessageTimeout = ko.observable('3000');
        self.errorMessageTimeout = ko.observable('5000');
        
        self.init = function() {
            self.routeInstance(oj.Router.rootInstance);
            self.messages([]);
            
            const routeData = self.routeInstance().retrieve();
            self.heading(`Edit employee ${routeData.employeeId}`);
            
            const { mode, employeeId } = routeData;
            
            if(!mode || !employeeId) {
                oj.Router.rootInstance.go("employee");
            }
            
            const model = emp.getEmployeeModel();
            model.id = employeeId;
            
            model.fetch({
                success: function(employeeModel) {
                    self.employeeModel(employeeModel);
                },
                error: function(err) {
                    console.log(err);
                }
            });
            
        };
        
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
        
        self.saveTransaction = function() {
            const modifiedEmployee = self.employeeModel().attributes;
            self.employeeModel().save(modifiedEmployee, {
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
                            msgDetail: 'Failed to update employee'
                    }, self.confirmationMessageTimeout()));
                    setTimeout(function() {
                        self.refreshTransaction(false);
                    }, self.errorMessageTimeout());
                }
            });
        };
        
    };
    
    return new EditEmployeeModel();
    
});