sap.ui.jsview("Logistics.views.Overview.OverviewClock.OverviewClock", {

	getControllerName: function () {
	    return "Logistics.views.Overview.OverviewClock.OverviewClock";
	},
	
	createContent: function (oController)
	{
	    var controls = [];
	    
	    var chartBox = new sap.m.VBox({
	    	justifyContent: sap.m.FlexJustifyContent.SpaceBetween,
	    	width: "100%",
	        items: [
	        	new sap.m.HBox({
			    	justifyContent: sap.m.FlexJustifyContent.SpaceBetween,
			    	width: "100%",
			    	items: [
			    	     new sap.m.VBox({
			    	    	 alignItems: sap.m.FlexAlignItems.Center,
			    	    	 items: [
								new sap.m.FlexBox({
								    id: "gaugeClockCostoVentas"
								 }),
								 new sap.m.Text({text: "{i18n>CostoLogisticoVentas}"})
	    	    	         ]
			    	     }).addStyleClass("marginLeft"),
			    	     new sap.m.VBox({
			    	    	 alignItems: sap.m.FlexAlignItems.Center,
			    	    	 items: [
								new sap.m.FlexBox({
								    id: "gaugeClockCobertura"
								 }),
								 new sap.m.Text({text: "{i18n>Cobertura}"})
	    	    	         ]
			    	     }),
			    	     new sap.m.VBox({
			    	    	 alignItems: sap.m.FlexAlignItems.Center,
			    	    	 items: [
								new sap.m.FlexBox({
								    id: "gaugeClockGastosTransporteVentas"
								 }),
								 new sap.m.Text({text: "{i18n>Gastos}"})
	    	    	         ]
			    	     }).addStyleClass("marginRight")
		        	 ]
	        	}).addStyleClass("marginTop").addStyleClass("marginBottom"),
				new sap.m.Text({
				    visible: false,
				    text: {
				        parts: [{ path: "logistics>/" }],
				        formatter: function ()
				        {
				            //renderiza grafico
				            sap.ui.getCore().byId("OverviewClock").getController().updateCharts();
				        }
				    }
				})
	        ]
	    });
	    controls.push(chartBox);

		return controls;
	}
});