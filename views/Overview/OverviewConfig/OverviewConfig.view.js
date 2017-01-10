sap.ui.jsview("Logistics.views.Overview.OverviewConfig.OverviewConfig", {

	getControllerName: function () {
	    return "Logistics.views.Overview.OverviewConfig.OverviewConfig";
	},
	
	createContent: function (oController)
	{
	    var controls = [];

	    var configBox = new sap.m.VBox({
            id: "configBox",
	        items: [
				new sap.m.Text({
				    text: "{i18n>Configuration}"
				}).addStyleClass("viewSubtitle"),
                new sap.m.Text({ text: "{i18n>Sucursales}" }),
                new sap.m.Input({ value: "{configuration>/Parameters/Sucursales}" }),
                new sap.m.Text({ text: "{i18n>CostoKmFlota}" }),
                new sap.m.Input({ value: "{configuration>/Parameters/CostoXKMFlotaPropia}" }),
                new sap.m.Text({ text: "{i18n>CostoKmTractor}" }),
                new sap.m.Input({ value: "{configuration>/Parameters/CostoXKMTractorTerc}" }),
                new sap.m.Text({ text: "{i18n>CostoKmDoubleStar}" }),
                new sap.m.Input({ value: "{configuration>/Parameters/CostoXKMFlotaDoubleStar}" })
            ]
	    });
	    
	    var targetsBox = new sap.m.VBox({
            id: "targetsBox",
	        items: [
				new sap.m.Text({
				    text: "{i18n>Targets}"
				}).addStyleClass("viewSubtitle"),
                new sap.m.Text({ text: "{i18n>Cobertura}" }),
                new sap.m.Input({ value: "{configuration>/Parameters/CoberturaTarget}" }),
                new sap.m.Text({ text: "{i18n>CostoLogisticoVentas}" }),
                new sap.m.Input({ value: "{configuration>/Parameters/CostoLogisticoTarget}" }),
                new sap.m.Text({ text: "{i18n>CostoXM3Transportado}" }),
                new sap.m.Input({ value: "{configuration>/Parameters/CostoMt3TranspTarget}" }),
                new sap.m.Text({ text: "{i18n>Gastos}" }),
                new sap.m.Input({ value: "{configuration>/Parameters/GastosXVentasTarget}" })
            ]
	    });
	    
	    var parametersBox = new sap.m.HBox({
	    	justifyContent: sap.m.FlexJustifyContent.SpaceAround,
	    	items: [
    	        configBox,
    	        targetsBox
	    	]
	    });

	    controls.push(parametersBox);
	    
	    controls.push(
	    	new sap.m.HBox({
	    		width: "100%",
	    		justifyContent: sap.m.FlexJustifyContent.Center,
	    		items: [
					new sap.m.Button({
					    id: "btnSaveConfig",
					    icon: "sap-icon://save",
					    text: "{i18n>Guardar}",
					    press: [oController.onSaveConfig, oController]
					})
		        ]
	    	})
        );

		return controls;
	}
});