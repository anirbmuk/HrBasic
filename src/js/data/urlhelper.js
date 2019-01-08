define(['./../data/server'], function(server) {
    
    var self = this;
    self.server = server.getServerModel();
    self.url = `http://${self.server.host}:${self.server.port}/${self.server.root}`;
    
    getBaseUrl = function(node) {
        let url = `${self.url}`;
        url += `${node}`;
        return url;
    };
    
    getUrl = function(node, filter, options) {
        const pattern = { node, filter };
        const { limit, totalResults, onlyData, finder } = options;
        
        let url = `${self.url}`;
        if (pattern.filter && pattern.filter.length > 0) {
           url += `${pattern.node}?limit=${limit}&totalResults=${totalResults}&onlyData=${onlyData}`;
           let finderAdded = false, itemAdded = false;
           for (const item of pattern.filter) {
               if (item.value) {
                   if (!finderAdded && finder) {
                       url += `&finder=${finder};`;
                       finderAdded = true;
                   }
                   
                   if (!itemAdded) {
                       url += `${item.key}=${item.value}`;
                       itemAdded = true;
                   } else {
                       url += `,${item.key}=${item.value}`;
                   }

               }
           }
        } else {
            url += `${pattern.node}?limit=${limit}&totalResults=${totalResults}&onlyData=${onlyData}`;
        }
        
        return url;
    };
    
    return {
        getBaseUrl,
        getUrl
    };
    
});