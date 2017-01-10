	sap.ui.jsview("Logistics.views.Overview.Overview", {

	getControllerName: function () {
	    return "Logistics.views.Overview.Overview";
	},

	createContent: function (oController)
	{
		var page = new sap.m.Page({
			id: "overviewPage",
			footer: [
				
			]
		});

	    page.addContent(new sap.m.Text({ text: "{i18n>Resumen}" }).addStyleClass("viewSubtitle"));
		page.addContent(new sap.m.VBox({id: "viewsBox"}));
	}
});