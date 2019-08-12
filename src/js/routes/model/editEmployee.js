define(['ojs/ojcore', 'knockout', 'jquery', 'crud/employeevm', 'common/utils/messageutils', 'common/utils/dateutils',
       'ojs/ojinputnumber', 'ojs/ojdatetimepicker', 'ojs/ojvalidationgroup', 'ojs/ojswitch', 'ojs/ojfilepicker', 'ojs/ojavatar'],
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
        self.avatarUrl = ko.observable('');
        self.avatarInitials = ko.observable();
        
        self.employeeValid = ko.observable();
        self.employeeParams = {
            limit: 5,
            pageSize: 5,
            totalResults: true,
            onlyData: true,
            expand: false
        };
        
        self.handleActivated = function() {
            
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
                        self.avatarInitials(oj.IntlConverterUtils.getInitials(employeeModel.attributes.FirstName, employeeModel.attributes.LastName));
                        self.getProfileImage(employeeId);
                    },
                    error: function(err) {
                        console.log(err);
                    }
                });
            } else {
                self.EmployeeData(emp.getEmployeeCollection(self.employeeParams));
                self.EmployeeModel(model);
            }
            
        };
        
        self.validators = [
            {
                
            }
        ];
        
        self.getProfileImage = function(employeeId) {
            const profileImageUrl = emp.getProfileImage(employeeId);
            const successCallback = function() {
                self.avatarUrl(profileImageUrl);
            };
            const errorCallback = function(jqXHR, textStatus, errorThrown) {
                self.avatarUrl('');
            };
            emp.getRestData(profileImageUrl, null, successCallback, errorCallback);
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
        
        self.successCallback = function(successMessage) {
            return function (result,status,xhr) {
                self.messages(messageutils.buildMessage('confirmation', {
                        msgSummary: 'Success',
                        msgDetail: successMessage
                }, self.confirmationMessageTimeout()));
                setTimeout(function() {
                    self.refreshTransaction(true);
                }, self.confirmationMessageTimeout());
            };
        };
        
        self.errorCallback = function() {
            return function(jqXHR, textStatus, errorThrown) {
                self.messages(messageutils.buildMessage('error', {
                        msgSummary: 'Error',
                        msgDetail: jqXHR.responseText
                }, self.confirmationMessageTimeout()));
            };
        };
        
        self.createEmployee = function(collection, employee) {
            const success = self.successCallback('One employee created');
            const error = self.errorCallback();
            collection.create(employee, {
                contentType: 'application/vnd.oracle.adf.resourceitem+json',
                success,
                error
            });
        };
        
        self.editEmployee = function(collection, employee) {
            const success = self.successCallback('One employee updated');
            const error = self.errorCallback();
            collection.save(employee, {
                contentType: 'application/vnd.oracle.adf.resourceitem+json',
                patch: 'patch',
                success,
                error
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
        
        self.uploadEmployeeImage = function(event) {
            if (event.detail) {
                const uploadedFile = event.detail.files[0];
                const base64File = self.getBase64(uploadedFile).then(function(data) {
                    if (data) {
                        const image = JSON.stringify({ "ProfileImage": data.split(',')[1] });
                        const collection = self.EmployeeModel();
                        const url = `${collection.urlRoot}/${collection.id}`;
                        const success = function (result,status,xhr) {
                                            self.messages(messageutils.buildMessage('confirmation', {
                                                    msgSummary: 'Success',
                                                    msgDetail: `Profile image uploaded for employee id ${collection.id}`
                                            }, self.confirmationMessageTimeout()));
                                            self.avatarUrl(emp.getProfileImage(collection.id));
                                        };
                        const error = self.errorCallback();
                        emp.saveBlobData(url, image, success, error);
                    }
                });
            }
        };
        
        self.getBase64 = function(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        };
        
        self.handleDeactivated = function() {
            console.log('disconnecting editEmployee');
            oj.Router.rootInstance.store();
        };
        
    };
    
    return new EditEmployeeModel();
    
});