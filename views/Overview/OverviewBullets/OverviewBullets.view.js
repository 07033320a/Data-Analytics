sap.ui.jsview("Logistics.views.Overview.OverviewBullets.OverviewBullets", {

	getControllerName: function () {
	    return "Logistics.views.Overview.OverviewBullets.OverviewBullets";
	},
	
	createContent: function (oController)
	{
	    var controls = [];
	    
	    var chartBox = new sap.m.VBox({
	    	justifyContent: sap.m.FlexJustifyContent.SpaceBetween,
	    	width: "100%",
	        items: [
			    new sap.m.VBox({
			        id: "bulletsOverview",
			        width: "100%",
			        alignItems: sap.m.FlexAlignItems.Center,
			        justifyContent: sap.m.FlexJustifyContent.Center
			    }),
				new sap.m.Text({
				    visible: false,
				    text: {
				        parts: [{ path: "logistics>/" }],
				        formatter: function ()
				        {
				            //renderiza grafico
				            sap.ui.getCore().byId("OverviewBullets").getController().updateChart();
				        }
				    }
				})
	        ]
	    });
	    controls.push(chartBox);

		return controls;
	}
});