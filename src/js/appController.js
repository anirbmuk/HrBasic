define(['ojs/ojcore', 'knockout', 'data/server', 'ojs/ojknockout', 'ojs/ojnavigationlist', 'ojs/ojrouter', 'ojs/ojmodule',
    'ojs/ojarraytabledatasource'],
  function(oj, ko, server) {
     function ControllerViewModel() {
       var self = this;

      var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);

      self.appName = ko.observable("JET HR Basic");
      self.userLogin = ko.observable("anirban.m.mukherjee@oracle.com");
      
      server.setServerModel('127.0.0.1', 7101, 'hr/rest/v1/');
      
      oj.Router.defaults['urlAdapter'] = new oj.Router.urlParamAdapter();
      self.router = oj.Router.rootInstance;
      self.router.configure(
        {
          'location':  { label: 'Locations', id: 'location', isDefault: true },
          'department': { label: 'Departments', id: 'department' },
          'employee': { label: 'Employees', id: 'employee' },
          'editEmployee': { label: 'Edit Employee', id: 'editEmployee' },
          'masterdetail': { label: 'Master-Detail', id: 'masterdetail' },
          'charts': { label: 'Charts', id: 'charts' },
          'demo': { label: 'Playground', id: 'demo' }
        });
        
      self.navigationData = [
      {name: 'Locations', id: 'location',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-catalog-icon-24'},
      {name: 'Departments', id: 'department',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24'},
      {name: 'Employees', id: 'employee',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24'},
      {name: 'Master-Detail', id: 'masterdetail',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-catalog-icon-24'},
      {name: 'Charts', id: 'charts',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'},
      {name: 'Playground', id: 'demo',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-education-icon-24'}
      ];
      self.navigationList = new oj.ArrayTableDataSource(self.navigationData, {idAttribute: 'id'});

     }

     return new ControllerViewModel();
  }
);
