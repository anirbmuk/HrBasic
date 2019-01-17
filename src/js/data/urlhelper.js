define(['data/server'], function(server) {
    
    var self = this;
    self.server = server.getServerModel();
    self.url = `http://${self.server.host}:${self.server.port}/${self.server.root}`;
    
    function getBaseUrl(node, expand, child) {
        let url = `${self.url}`;
        if (node) {
            url += `${node}`;
        }
        if (expand) {
            url += `?expand=${child}`;
        }
        return url;
    };
    
    function getUrl(node, filter, options) {
        const pattern = { node, filter };
        const { limit, totalResults, onlyData, finder, expand, child } = options;
        
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
        if (expand) {
            url += `&expand=${child}`;
        }
        
        return url;
    };
    
    function getChildUrl(node, filter, child, options) {
        const pattern = { node, filter };
        const { limit, totalResults, onlyData } = options;
        
        let url = `${self.url}`;
        if (!pattern.node) {
            return null;
        }
        url += `${pattern.node}`;
        if (pattern.filter) {
            url += `/${pattern.filter}`;
        }
        if (child) {
            url += `/child/${child}`;
        }
        url += `?limit=${limit}&totalResults=${totalResults}&onlyData=${onlyData}`;
        console.log(url);
        
        return url;
        
    };
    
    return {
        getBaseUrl,
        getUrl,
        getChildUrl
    };
    
});