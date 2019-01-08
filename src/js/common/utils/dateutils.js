define(['ojs/ojcore', 'ojs/ojvalidation-datetime'], function(oj) {
    
    getConverter = function(pattern) {
        return oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter({
            pattern
        });
    };
    
    getStringFromDate = function(date, format) {
        const converter = getConverter(format);
        const newDate = new Date(date);
        return converter.format(oj.IntlConverterUtils.dateToLocalIso(newDate));
    };
    
    return {
        getConverter,
        getStringFromDate
    };
    
});