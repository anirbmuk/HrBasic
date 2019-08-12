define(['ojs/ojcore', 'knockout', 'ojs/ojrouter', 'ojs/ojnavigationlist',
        'ojs/ojselectcombobox',
        'ojs/ojbutton'],
function(oj, ko) {
    
    function RouterTabModel() {
        
        const self = this;
        self.heading = ko.observable('Router Param Demo');
        self.defaultTab = ko.observable('tab1');
        self.selectedTab = ko.observable('tab1');
        
        self.handleActivated = function() {
            console.log(oj.Router.rootInstance);
            const routerInstanceValue = oj.Router.rootInstance.currentState().value;
            const routerParams = oj.Router.rootInstance.retrieve();
            
            console.log('routerInstanceValue', routerInstanceValue);
            console.log('routerParams', routerParams);
            
            if (routerParams) {
                self.defaultTab(routerParams.defaultTab);
            } else if (routerInstanceValue) {
                self.defaultTab(routerInstanceValue.defaultTab);
                oj.Router.rootInstance.store();
            }
        };
        
        self.handleDeactivated = function() {
            oj.Router.rootInstance.store();
        };
            
        self.selectTab = function(event) {
            oj.Router.rootInstance.store({
                defaultTab: self.selectedTab()
            });
            oj.Router.rootInstance.go("router-tab");
        };
        
    }
    
    return RouterTabModel;
});