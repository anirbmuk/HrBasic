define(['ojs/ojcore', 'knockout', 'jquery', 'crud/locationvm', 'common/utils/tableutils', 'common/composites/hr-table/loader',
        'ojs/ojinputtext', 'ojs/ojlabel', 'ojs/ojbutton', 'ojs/ojpagingtabledatasource',
        'ojs/ojarraytabledatasource', 'ojs/ojcollectiontabledatasource'],
        (oj, ko, $, location, tableutils) => {

    function LocationViewModel() {
        var self = this;

        self.heading = 'Locations';
        
        self.countryId = 'Country Id';
        self.countryIdHelpDef = 'Enter country id to search';
        self.countryHelpSource = `https://www.oracle.com/`;
        self.isCountryIdRequired = false;
        self.countryIdInput = ko.observable();

        self.pagingDatasource = ko.observable(new oj.PagingTableDataSource(new oj.ArrayTableDataSource([])));
        
        self.city = 'City';
        self.cityHelpDef = 'Enter city to search';
        self.cityHelpSource = `https://www.oracle.com/`;
        self.isCityRequired = false;
        self.cityInput = ko.observable();
        
        self.LocationData = ko.observable();

        self.locationColumns = location.locationColumns;
        
        self.selected = ko.observable();
        
        self.switchSelected = ko.observable(true);
        
        self.selectionMode = ko.observable('single');
        self.selectionType = ko.computed(function() {
            return {
                'row': self.selectionMode()
            };
        }, self);
        
        self.locationParams = {
            limit: 5,
            pageSize: 5,
            totalResults: true,
            onlyData: true,
            finder: 'SearchLocations',
            expand: false
        };

        self.locationSearch = function () {
            const locationSearchObject = [{ key: 'Bind_countryid', value: self.countryIdInput() },
                                          { key: 'Bind_city', value: self.cityInput() }];
            self.LocationData(location.getLocationCollection(locationSearchObject, self.locationParams));
            self.pagingDatasource(new oj.PagingTableDataSource(new oj.CollectionTableDataSource(self.LocationData())));
        };
        
        self.locationSelection = function(event, table) {
            self.selected('');
            Promise.all(tableutils.getSelectionData(table, event, self.pagingDatasource())).then(selectionData => {
                let arr = [];
                for (var i=0; i<selectionData.length; i++) {
                    const { City, CountryId, PostalCode, StateProvince } = selectionData[i]['data'];
                    arr.push([City, StateProvince, PostalCode, CountryId ].join(', '));
                }
                self.selected(arr.join(' | '));
            }).catch(err => {
                console.log(err);
            });
        };

    };

    return new LocationViewModel();

});

