sap.ui.jsview("Logistics.views.App", {
	
	createContent: function (oController) {

	    this.setDisplayBlock(true);

	    var app = new sap.m.App({
	        id: "app",
	        homeIcon: { 
	        	'phone': FormatterHelper.getPath() + '/img/favicon.png',
	        	'phone@2': FormatterHelper.getPath() + '/img/favicon.png',
	        	'tablet': FormatterHelper.getPath() + '/img/favicon.png',
	        	'tablet@2': FormatterHelper.getPath() + '/img/favicon.png',
	        	'icon': FormatterHelper.getPath() + '/img/favicon.png' 
	        },
	        pages: [
	            sap.ui.jsview("Main", "Logistics.views.Main.Main")
	        ]
	    });

	    //traducciones
	    i18nTranslationHelper.initi18nModel();
		var i18nModel = this.getModel("i18n");

	    //title
	    document.title = i18nModel.getResourceBundle().getText("TituloAplicacion");

		LogisticsService.loadModel();
		
	    return app;
	}
});