define(['ojs/ojcore',
        'knockout',
        'ojs/ojchart',
        'ojs/ojdialog',
        'ojs/ojbutton',
        'ojs/ojlabel',
        'ojs/ojinputtext',
        'ojs/ojdatetimepicker'],
function(oj, ko) {
    
    function HrChartModel(context) {
        
        const self = this;
        self.composite = context.element;
        self.properties = context.properties;
        
        self.showChartContextMenu = ko.observable(self.properties.contextMenu.showContextMenu);
        self.contextMenu = ko.observable(self.properties.contextMenu);
        
        self.chartComponentId = ko.observable(self.properties.chartComponentId);
        self.chartSeriesValue = self.properties.chartSeriesValue;
        self.chartGroupsValue = ko.observableArray(self.properties.chartGroupsValue);
        
        self.styleDefaults = self.properties.styleDefaults;
        self.valueFormats = self.properties.valueFormats;
        self.pieCenter = self.properties.pieCenter;
        self.chartDefaults = self.properties.chartDefaults;
        self.legend = self.properties.chartLegend;
        
        self.chartType = self.chartDefaults.type;
        self.animationOnDisplay = self.chartDefaults.animationOnDisplay;
        self.animationOnDataChange = self.chartDefaults.animationOnDataChange;
        self.selectionMode = self.chartDefaults.selectionMode;
        self.drilling = self.chartDefaults.drilling;
        self.sorting = self.chartDefaults.sorting;
        
        self.chartItem = ko.observable({});
        
        self.filterGroupTemplate = self.properties.filterOptions;
        
        self.onFilterDialogOK = function() {
            self.filterGroupTemplate.onFilterDialogOK();
            $('#filterModal')[0].close();
        };
        
        self.onFilterDialogCancel = function() {
            $('#filterModal')[0].close();
        };
        
        self.onOjDrill = function(event) {
            self.handleChartSelection(event.detail);
            event.stopPropagation();
        };
        
        self.beforeContextMenu = function(event) {
            const target = event.detail.originalEvent.target;
            const chart = document.getElementById(self.chartComponentId());
            if (chart) {
                const context = chart.getContextByNode(target);
                if (context && context.subId === "oj-chart-item") {
                    self.chartItem(chart.getDataItem(context["seriesIndex"], context["itemIndex"]));
                }
            }
        };
        
        self.contextMenuAction = function(event) {
             if (event.target && event.target.value === 'action1') {
                $('#filterModal')[0].open();
            } else {
                self.handleContextMenuAction(event.target);
            }
            event.stopPropagation();
        };
        
    }
    
    HrChartModel.prototype.handleChartSelection = function(detail) {
        const self = this;
        
        const customDetail = JSON.parse(JSON.stringify(detail));
        customDetail.custominfo1 = 'Custom Information 1';
        customDetail.custominfo2 = 'Custom Information 2';
        const eventParams = {
            bubbles: true,
            cancelable: false,
            detail: customDetail
        };
        
        self.composite.dispatchEvent(new CustomEvent('drillDown', eventParams));        
    };
    
    HrChartModel.prototype.handleContextMenuAction = function(detail) {
        const self = this;
        
        const customDetail = JSON.parse(JSON.stringify(detail));
        customDetail.itemSelected = detail;
        customDetail.selectedValue = detail.value;
        customDetail.series = self.chartItem().series;
        customDetail.group = self.chartItem().group;
        customDetail.value = self.chartItem().value;
        const eventParams = {
            bubbles: true,
            cancelable: false,
            detail: customDetail
        };
        
        self.composite.dispatchEvent(new CustomEvent('contextMenuAction', eventParams));        
    };
    
    return HrChartModel;
    
});