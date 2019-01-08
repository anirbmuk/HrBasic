define(['ojs/ojcore', 'knockout', 'ojs/ojtable', 'ojs/ojpagingcontrol', 'ojs/ojswitch',
        'ojs/ojdialog'], 
    function(oj, ko) {
    
    function HrTableViewModel(ctx) {
        var self = this;
        self.isChecked = ko.observable(ctx.properties.selectionType.row === 'single');
        
        self.isChecked.subscribe(function(newvalue) {
            ctx.properties.selectionType.row = newvalue ? 'single' : 'multiple';
        });
        
        self.onRowEdit = function(event) {
            console.log('table-dbl-clicked', event);
        };
        
        self.onDialogClose = function(event) {
            document.getElementById('crudmodal').close();
        };
        
        self.editEmployee = function(employeeIds) {
            console.log('editing employee', employeeIds);
        };
    };
    
    HrTableViewModel.prototype.attached = function(ctx) {
        var self = this;
        self.composite = ctx.element;
        self.composite.addEventListener('dblclick', function(event) {
            self.handleDoubleClickEvent(event);
        });
        self.composite.addEventListener('gridDblClick', function(event){
            self.onRowEdit(event);
        });
    };
    
    HrTableViewModel.prototype.handleDoubleClickEvent = function(event) {
        var self = this;
        const eventParams = {
            bubbles: true,
            cancelable: false
        };
        self.composite.dispatchEvent(new CustomEvent('gridDblClick', eventParams));
    };
    
    return HrTableViewModel;
    
});