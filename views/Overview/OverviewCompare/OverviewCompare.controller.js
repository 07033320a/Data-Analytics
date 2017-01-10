sap.ui.controller("Logistics.views.Overview.OverviewCompare.OverviewCompare", {
	
	onAfterRendering: function() {
        CompareService.loadModel();
	},

    onSearch: function() {

        var dateFrom = sap.ui.getCore().byId("dateFrom").getDateValue();
        var dateTo = sap.ui.getCore().byId("dateTo").getDateValue();

        if(dateFrom.toString() == dateTo.toString())
            return MessageBoxHelper.showAlert("Alerta","ErrorFechasIguales");

        CompareService.loadModel();
    },

    updateChart: function ()
    {
        CompareChartHelper.updateData();
    },
    
    onExit: function()
    {
        clearInterval(CompareChartHelper._currentTransformation);
    },
    
    playPauseTransformation: function(evt)
    {
        var btn = evt.getSource();

        if(CompareChartHelper._currentTransformation)
        {
            clearInterval(CompareChartHelper._currentTransformation);
            CompareChartHelper._currentTransformation = null;
            btn.setSrc(FormatterHelper.getPath() + "/img/black/play.png");
        }
        else
        {
            CompareChartHelper.startTransformation();
            btn.setSrc(FormatterHelper.getPath() + "/img/black/pause.png");
        }
    }
});