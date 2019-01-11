define(['ojs/ojcore', 'knockout', './data/server', 'ojs/ojknockout', 'ojs/ojnavigationlist', 'ojs/ojrouter', 'ojs/ojmodule',
    'ojs/ojarraytabledatasource'],
  function(oj, ko, server) {
     function ControllerViewModel() {
       var self = this;

      // Media queries for repsonsive layouts
      var smQuery = oj.ResponsiveUtils.getFrameworkQuery(oj.ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = oj.ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);

      // Header
      // Application Name used in Branding Area
      self.appName = ko.observable("HR Basic");
      // User Info used in Global Navigation area
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
          'demo': { label: 'Playground', id: 'demo' }
        });
        
      self.navigationData = [
      {name: 'Locations', id: 'location',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'},
      {name: 'Departments', id: 'department',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24'},
      {name: 'Employees', id: 'employee',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24'},
      {name: 'Playground', id: 'demo',
       iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-chart-icon-24'}
      ];
      self.navigationList = new oj.ArrayTableDataSource(self.navigationData, {idAttribute: 'id'});

      // Footer
      function footerLink(name, id, linkTarget) {
        this.name = name;
        this.linkId = id;
        this.linkTarget = linkTarget;
      }
      self.footerLinks = ko.observableArray([
        /*new footerLink('About Oracle', 'aboutOracle', 'http://www.oracle.com/us/corporate/index.html#menu-about'),
        new footerLink('Contact Us', 'contactUs', 'http://www.oracle.com/us/corporate/contact/index.html'),
        new footerLink('Legal Notices', 'legalNotices', 'http://www.oracle.com/us/legal/index.html'),
        new footerLink('Terms Of Use', 'termsOfUse', 'http://www.oracle.com/us/legal/terms/index.html'),
        new footerLink('Your Privacy Rights', 'yourPrivacyRights', 'http://www.oracle.com/us/legal/privacy/index.html')*/
      ]);
     }

     return new ControllerViewModel();
  }
);
