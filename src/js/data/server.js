define(function() {
    
    let serverModel;
    let self = this;
    
    const ServerModel = function (host, port, root) {
        this.host = host;
        this.port = port;
        this.root = root;
    };
    
    function setServerModel(host, port, root) {
        self.serverModel = new ServerModel(host, port, root);
    };
    
    function getServerModel() {
        return self.serverModel;
    };
    
    return {
        getServerModel,
        setServerModel
    };
    
});