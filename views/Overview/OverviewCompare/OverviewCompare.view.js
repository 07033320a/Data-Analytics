jQuery.sap.require("Logistics.views.Overview.OverviewCompare.CompareChartHelper");
sap.ui.jsview("Logistics.views.Overview.OverviewCompare.OverviewCompare", {

	getControllerName: function () {
	    return "Logistics.views.Overview.OverviewCompare.OverviewCompare";
	},
	
	createContent: function (oController)
	{
	    var controls = [];

		var searchBox = new sap.m.HBox({
			id: "searchBox",
			justifyContent: sap.m.FlexJustifyContent.SpaceAround,
			items: [
				new sap.m.HBox({
					alignItems: sap.m.FlexAlignItems.Center,
					items: [
						new sap.m.Text({
							text: "{i18n>KPI}",
							width: "25pt"
						}),
						new sap.m.Select({
							id: "selectKPI",
							items: [
								new sap.ui.core.Item({text: "{i18n>CostoXM3Transportado}", key: ""}),
								new sap.ui.core.Item({text: "{i18n>CostoLogisticoVentas}", key: ""}),
								new sap.ui.core.Item({text: "{i18n>Cobertura}", key: ""}),
								new sap.ui.core.Item({text: "{i18n>Gastos}", key: ""})
							]
						})
					]
				}),
				new sap.m.HBox({
					items: [
						new sap.m.HBox({
							alignItems: sap.m.FlexAlignItems.Center,
							items: [
								new sap.m.Text({text: "{i18n>Desde}"}),
								new sap.m.DateTimeInput({
									id: "dateFrom",
									//width: "40%",
									displayFormat: "MM/yyyy",
									dateValue: new Date(),
									valueFormat: "MM.yyyy"
								})
							]
						}).addStyleClass('divWidth'),
						new sap.m.HBox({
							alignItems: sap.m.FlexAlignItems.Center,
							items: [
								new sap.m.Text({text: "{i18n>Hasta}"}),
								new sap.m.DateTimeInput({
									id: "dateTo",
									//width: "40%",
									displayFormat: "MM/yyyy",
									dateValue: new Date(),
									valueFormat: "MM.yyyy"
								})
							]
						}).addStyleClass('divWidth')
					]
				}),
				new sap.m.Button({
					id: "btnSearchBox",
					text: "{i18n>Buscar}",
					icon: "sap-icon://search",
					press: [oController.onSearch, oController]
				})
			]
		});
		controls.push(searchBox);

		var chartBox = new sap.m.VBox({
			id: "chartBox",
			items: [
				new sap.m.Image({
					id: "btnPlayPause",
					height: "30px",
					src: "img/black/pause.png",
					press: [oController.playPauseTransformation,oController]
				}).addStyleClass("playPauseBtn"),
				new sap.m.VBox({
					items: [
						new sap.m.HBox({
							id: "chartCompare"
						})
					]
				})
			]
		});
		controls.push(chartBox);

		return controls;
	}
});