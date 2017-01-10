sap.ui.controller("Logistics.views.Overview.OverviewTable.OverviewTable", {
	
	onAfterRendering: function() {
		var excelBox = sap.ui.getCore().byId("downloadExcelBox");
		excelBox.setVisible(true);
	},

});