define(['ojs/ojcore',
        'knockout'], 
function(oj, ko) {
    
    function HrBadgeViewModel(ctx) {
        const self = this;
        self.composite = ctx.element;
    };
    
    HrBadgeViewModel.prototype.attached = function(ctx) {
        const self = this;
        self.composite.addEventListener('click', function(event) {
            self.handleBadgeFlip(event);
        });
    };
    
    HrBadgeViewModel.prototype.handleBadgeFlip = function(ctx) {
        const self = this;
        
        $(self.composite).children('.badge-flip-container').toggleClass('badge-flipped');
        
        const eventParams = {
            bubbles: true,
            cancelable: false
        };
        self.composite.dispatchEvent(new CustomEvent('badgeFlip', eventParams));
    };
    
    return HrBadgeViewModel;
    
});