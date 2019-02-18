define(['ojs/ojcore',
        'knockout',
        'ojs/ojchart'],
function(oj, ko) {
    
    function HrChartModel(context) {
        
        const self = this;
        self.composite = context.element;
        self.properties = context.properties;
        
        self.chartComponentId = ko.observable(self.properties.chartComponentId);
        self.chartSeriesValue = ko.observableArray(self.properties.chartSeriesValue);
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
        
        self.onOjDrill = function(event) {
            self.handleChartSelection(event.detail);
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
    
    return HrChartModel;
    
});