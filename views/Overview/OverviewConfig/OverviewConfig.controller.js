sap.ui.controller("Logistics.views.Overview.OverviewConfig.OverviewConfig", {
	
	onAfterRendering: function() {
		ConfigurationService.loadModel();
	},

	onSaveConfig: function () {
		BusyDialogHelper.open("","Guardando");
		ConfigurationService.saveData(0);
	}

});