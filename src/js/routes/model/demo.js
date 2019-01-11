define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojlabel',
'ojs/ojinputtext', 'ojs/ojbutton', 'ojs/ojvalidationgroup'], function(oj, ko, $) {
    
    function DemoViewModel() {
        
        const self = this;
        
        self.firstName = ko.observable('');
        self.lastName = ko.observable('');
        
        self.validators = [
            {
                type: 'length',
                options: { 
                    min: 5, 
                    max: 30,
                    messageSummary : {
                        tooLong: 'Maximum {max} characters allowed',
                        tooShort: 'Minimum {min} characters required'
                    },
                    messageDetail: { 
                        tooLong: 'Number of characters is too high. Enter at most {max} characters',
                        tooShort: 'Number of characters is too low. Enter at least {min} characters.'}
                    }
            }
        ];
        
        self.validateFn = function() {
            const tracker = $("#tracker")[0];
            if (tracker.valid !== 'valid') {
                tracker.showMessages();
                tracker.focusOn("@firstInvalidShown");
            } else {
                console.log('all fields validated');
            }
        };
        
        self.novalidateFn = function() {
            console.log('novalidate');
        };
        
        self.validGroup = ko.observable();
        
        self.dataTemplate = {
            name: 'demo-template',
            value: {
                components: [
                    {
                        component: 'ojButton',
                        id: 'btn1',
                        label: 'Save',
                        cssClass: 'oj-button oj-button-confirm',
                        clickAction: self.validateFn
                    },
                    {
                        component: 'ojButton',
                        id: 'btn2',
                        label: 'Cancel',
                        cssClass: 'oj-button oj-button-primary',
                        clickAction: self.novalidateFn
                    }
                ]
            }
        };
        
        self.groupTemplate = {
            name: 'group-template',
            value: {
                groups: [
                    {
                        component: 'ojInputText',
                        id: 'input1',
                        label: 'First Name',
                        inputValue: self.firstName(),
                        isRequired: true,
                        validators: self.validators
                    },
                    {
                        component: 'ojInputText',
                        id: 'input2',
                        label: 'Last Name',
                        inputValue: self.lastName(),
                        isRequired: false,
                        validators: []
                    }
                ]
            }
        };
        
    };
    
    return new DemoViewModel();
    
});