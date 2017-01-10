jQuery.sap.require("sap.ui.core.UIComponent");
jQuery.sap.require("Logistics.services.LogisticsService");
jQuery.sap.require("Logistics.services.CompareService");
jQuery.sap.require("Logistics.services.ConfigurationService");
jQuery.sap.require("Logistics.utils.FormatterHelper");
jQuery.sap.require("Logistics.utils.i18nTranslationHelper");
jQuery.sap.require("Logistics.utils.MessageBoxHelper");
jQuery.sap.require("Logistics.utils.BusyDialogHelper");
jQuery.sap.require("Logistics.utils.NavigationHelper");
jQuery.sap.require("Logistics.utils.ViewHelper");
jQuery.sap.require("Logistics.utils.ExcelExportHelper");
jQuery.sap.require("Logistics.utils.ProxyHelper");
jQuery.sap.require("sap.ui.core.util.Export");
jQuery.sap.require("sap.ui.core.util.ExportTypeCSV");


//C3
jQuery.sap.require("Logistics.lib.d3.d3_v3_min");
jQuery.sap.require("Logistics.lib.d3.d3-tip");
jQuery.sap.require("Logistics.lib.c3.c3_min");

sap.ui.core.UIComponent.extend("Logistics.Component", {
    metadata: {
        library: "Logistics",
        includes: [
			"css/styles.css",
            "lib/c3/c3.css"
        ]
    },

	createContent : function() {
	    // create root view
		var view = sap.ui.view({
			id : "App",
			viewName: "Logistics.views.App",
			type : "JS",
			viewData : { component : this }
		});

		return view;
	}
});