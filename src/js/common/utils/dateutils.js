define(['ojs/ojcore'], function(oj) {
    
    getConverter = function(pattern) {
        return oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter({
            pattern
        });
    };
    
    return {
        getConverter
    };
    
});