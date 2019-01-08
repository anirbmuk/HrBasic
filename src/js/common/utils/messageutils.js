define(['ojs/ojcore', 'ojs/ojmessages', 'ojs/ojmessage', 'ojs/ojarraydataprovider'],
function(oj) {
    
    function MessageUtils() {
        
        const self = this;
        
        self.buildMessage = function(type, msgData, timeout) {
            return {
                    severity: type,
                    summary: msgData.msgSummary,
                    detail: msgData.msgDetail,
                    autoTimeout: parseInt(timeout)
                };
        };

        self.messagesDataprovider = function(messages) {
            return new oj.ArrayDataProvider(messages);
        };
        
    }
    
    return new MessageUtils();
    
});