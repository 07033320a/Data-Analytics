jQuery.sap.require("Logistics.views.Overview.OverviewClock.ClockGaugeHelper");

sap.ui.controller("Logistics.views.Overview.OverviewClock.OverviewClock", {
	
	onAfterRendering: function() {
	    this.updateCharts();
	},

    updateCharts: function ()
    {
        //datos de modelo
        var currentYearModel = sap.ui.getCore().byId("App").getModel("currentYear");
        if (!currentYearModel)
            return;

        var previousYearModel = sap.ui.getCore().byId("App").getModel("previousYear");
        if (!previousYearModel)
            return;

        var targetsModel = sap.ui.getCore().byId("App").getModel("configuration");
        if (!targetsModel)
            return;

        //var overview = model.getData().Overview;
        var targets = targetsModel.getData().Parameters;
        var currentYear = currentYearModel.getData();
        var previousYear = previousYearModel.getData();

        //Promedio Suc por Camion
        ClockGaugeHelper.buildGauge({
            controlId: "gaugeClockCostoVentas",
            //label: i18nTranslationHelper.getTranslation("CostoLogisticoVentas"),
            value: Number(currentYear.CostoLogistico),
            lowThreshold: targets.CostoLogisticoTarget * 0.9,
            highThreshold: targets.CostoLogisticoTarget * 1.1,
            min: 0,
            max: BulletChartHelper.getMax(1, targets.CostoLogisticoTarget * 1.1, currentYear.CostoLogistico, previousYear.CostoLogistico),
            maximizeAscending: true
        });
        //Efectividad
        ClockGaugeHelper.buildGauge({
            controlId: "gaugeClockCobertura",
            //label: i18nTranslationHelper.getTranslation("Cobertura"),
            value: Number(currentYear.Cobertura),
            lowThreshold: targets.CoberturaTarget * 0.9,
            highThreshold: targets.CoberturaTarget * 1.1,
            min: 0,
            max: BulletChartHelper.getMax(1, targets.CoberturaTarget * 1.1, currentYear.Cobertura, previousYear.Cobertura),
            maximizeAscending: true
        });
        //Efectividad
        ClockGaugeHelper.buildGauge({
            controlId: "gaugeClockGastosTransporteVentas",
            //label: i18nTranslationHelper.getTranslation("Gastos"),
            value: Number(currentYear.GastosXVentas),
            lowThreshold: targets.GastosXVentasTarget * 0.9,
            highThreshold: targets.GastosXVentasTarget * 1.1,
            min: 0,
            max: BulletChartHelper.getMax(1, targets.GastosXVentasTarget * 1.1, currentYear.GastosXVentas, previousYear.GastosXVentas),
            maximizeAscending: true
        });
    }

});