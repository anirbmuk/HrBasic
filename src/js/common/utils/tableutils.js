define(function() {
    
    getSelectionData = function(table, event, data) {
        let allPromises = [];
        if (event.type === 'selectionChanged') {
            if (event.detail.value.length === 0) {
                return allPromises;
            }

            event.detail.value.forEach(function(newCurrentRow) {
                const startIndex = newCurrentRow['startIndex']['row'];
                const endIndex = newCurrentRow['endIndex']['row'];
                for (var i=startIndex; i<=endIndex; i++) {
                    const promise = data.at(i);
                    allPromises.push(promise);
                }
            });
        }
        return allPromises;
    };
    
    return {
        getSelectionData
    };
    
});