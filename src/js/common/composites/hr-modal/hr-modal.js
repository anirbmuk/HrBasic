define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojbutton', 'ojs/ojdialog'], 
    function(oj, ko) {
    
    function HrModalViewModel(ctx) {
        const self = this;
        
        ctx.props.then(propertyMap => {
            console.log(propertyMap);
        });
        
        self.composite = ctx.element;
    }
    
    HrModalViewModel.prototype.openModal = function() {
        const self = this;
        console.log('Hello world');
        return true;
    };
    
    return HrModalViewModel;
    
});