define(['ojs/ojcore',
        'knockout',
        'jquery',
        'common/composites/hr-chart/loader'],
    function(oj, ko, $) {
    
        function DemoViewModel() {

            const self = this;
            
            self.pieSeriesValue = ko.observableArray([
                    {
                        name: "Administration", items: [{ id: 10, value: 20 }]
                    },
                    {
                        name: "Shipping", items: [{ id: 20, value: 50 }]
                    },
                    {
                        name: "IT Support", items: [{ id: 30, value: 25 }]
                    },
                    {
                        name: "Payroll", items: [{ id: 40, value: 10 }]
                    }
                ]);
            
            self.pieGroupsValue = ko.observableArray(['Employee Count']);
            
            self.pieCenter = {
                labelStyle: { fontSize: '18px', color: '#99999' },
                label: 'Employee Count'
            };
            self.valueFormats = {
                series: {
                    tooltipLabel: 'Department'
                },
                value: {
                    tooltipLabel: 'Count'
                }
            };
            self.chartDefaults = {
                sorting: 'descending',
                selectionMode: 'none',
                drilling: 'on',
                type: 'pie',
                animationOnDisplay: 'auto',
                animationOnDataChange: 'auto'
            };
            self.styleDefaults = {
                pieInnerRadius: 0.8,
                dataLabelPosition: 'auto',
                threeDEffect: 'off'
            };
            self.pieLegend = {
                rendered: 'on'
            };
            self.contextMenu = {
                showContextMenu: true,
                options: [
                    {
                        id: "contextMenuOption1",
                        label: "Filter",
                        value: "filter"
                    },
                    {
                        id: "contextMenuOption2",
                        label: "Recalculate",
                        value: "action2"
                    },
                    {
                        id: "contextMenuOption2",
                        label: "View Details",
                        value: "action3"
                    }
                ]
            };
            self.filterOptions = {
                onFilterDialogOK: function() {
                    self.pieSeriesValue([
                    {
                        name: "Administration", items: [{ id: 10, value: 10 }]
                    },
                    {
                        name: "Shipping", items: [{ id: 20, value: 25 }]
                    },
                    {
                        name: "IT Support", items: [{ id: 30, value: 0 }]
                    },
                    {
                        name: "Payroll", items: [{ id: 40, value: 0 }]
                    }
                ]);
                },
                value: {
                    groups: [
                        {
                            component: 'ojInputDate',
                            id: 'oinput2',
                            label: 'Start Date',
                            inputValue: '',
                            isRequired: false,
                            visible: true
                        },
                        {
                            component: 'ojInputDate',
                            visible: true,
                            id: 'oinput3',
                            label: 'End Date',
                            inputValue: '',
                            isRequired: false
                        }
                    ]
                }
            };
            
            self.init = function() {
            };
            
            self.onDrillDownAction = function(event) {
                console.log(event);
            };
            
            self.contextMenuAction = function(event) {
                console.log(event.detail);
                console.log(`Clicked on ${event.detail.selectedValue} from ${event.detail.series} (${event.detail.value}).`);
            };

        }
    
    return new DemoViewModel();
    
});