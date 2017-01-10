jQuery.sap.require("Logistics.views.Overview.OverviewBullets.BulletChartHelper");

sap.ui.controller("Logistics.views.Overview.OverviewBullets.OverviewBullets", {
	
	onAfterRendering: function() {
	    this.updateChart();
	},

    updateChart: function ()
    {
        //toma datos de overview
        //verifica modelo
        var currentYearModel = sap.ui.getCore().byId("App").getModel("currentYear");
        var previousYearModel = sap.ui.getCore().byId("App").getModel("previousYear");
        if (!currentYearModel || !previousYearModel) {
            return;
        }
        //Promedio Suc por Camion
        BulletChartHelper.buildGauge({
            controlId: "bulletsOverview"
        });
    }
});