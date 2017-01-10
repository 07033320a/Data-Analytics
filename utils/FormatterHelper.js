jQuery.sap.require("sap.ui.core.format.NumberFormat");
jQuery.sap.declare("Logistics.utils.FormatterHelper");

FormatterHelper = {

	getPath: function()
	{
		return jQuery.sap.getModulePath("Logistics");
	},
		
    /******************************************NUMERIC************************************************/
    _floatFormatter: sap.ui.core.format.NumberFormat.getFloatInstance({
        minFractionDigits: 2,
        maxFractionDigits: 2,
        decimalSeparator: ".",
        groupingEnabled: true,
        groupingSeparator: ","
    }),

    formatStrToDec: function (q, decimals)
    {
        //return parseFloat(q).toPrecision(q.split(".")[0].length + decimals);
        return this._floatFormatter.format(q);
    },

    /******************************************NUMERIC************************************************/
    _numberFormatter: sap.ui.core.format.NumberFormat.getFloatInstance({
        maxFractionDigits: 0,
        decimalSeparator: ".",
        groupingEnabled: true,
        groupingSeparator: ","
    }),

    formatStrToInt: function (n)
    {
        n = parseInt(n);
        if(!isNaN(n))
            return this._numberFormatter.format(n);
    },

    /******************************************DATE************************************************/
    formatDateWithoutTime: function (dateStr)
    {
        if (dateStr)
            return dateStr.split("T")[0];
        return "";
    },

    _buildFormattedEntryId: function (entryId) {
        var keyPairs = [];
        for(var key in entryId)
            keyPairs.push(key + "='" + entryId[key] + "'");
        return "(" + keyPairs.join(",") + ")";
    }
};