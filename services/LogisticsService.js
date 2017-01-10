jQuery.sap.declare("Logistics.services.LogisticsService");

LogisticsService = {
	
	_jsonMode: true,
	_sServiceUrl: "/sap/opu/odata/sap/Z_LOGISTICS_DASHBOARD_SRV/",
	_sLogisticsReportModelId: "LogisticsReportModel",

    _getModel: function () {
        return new sap.ui.model.odata.ODataModel(ProxyHelper.getUrl(this._sServiceUrl), true);
    },

	_loadODataModel: function()
	{
        var odataModel = LogisticsService._getModel();

        var year = sap.ui.getCore().byId("dateInputMonth").getDateValue().getFullYear();

        odataModel.read("/DashboardSet(PlantCode='N002',Year='" + year + "')", {
            //urlParameters: '$top=20&$select=Name2,Pernr',
            success: jQuery.proxy(this._loadODataModelPreviousYear, this),
            error: jQuery.proxy(this._readODataOnError, this)
        });
	},

    _loadODataModelPreviousYear: function(data, response)
    {
        var app = sap.ui.getCore().byId("App");

        var jsonModel = new sap.ui.model.json.JSONModel();
        jsonModel.setData({
            Data: data.results
        });
        app.setModel(jsonModel, "currentYear");

        var odataModel = LogisticsService._getModel();

        var year = sap.ui.getCore().byId("dateInputMonth").getDateValue().getFullYear();

        odataModel.read("/DashboardSet(PlantCode='N002',Year='" + year - 1 + "')", {
            //urlParameters: '$top=20&$select=Name2,Pernr',
            success: jQuery.proxy(this._readODataOnSuccess, this),
            error: jQuery.proxy(this._readODataOnError, this)
        });
    },

    _readODataOnSuccess: function(data, response)
    {
        var app = sap.ui.getCore().byId("App");

        var jsonModel = new sap.ui.model.json.JSONModel();
        jsonModel.setData({
            Data: data.results
        });
        app.setModel(jsonModel, "previousYear");

        if(!app.getModel("configuration"))
        {
            ConfigurationService.loadModel();
        }
        else
        {
            BulletChartHelper.buildGauge({
                controlId: "bulletsOverview"
            });
            
            sap.ui.getCore().byId("OverviewClock").getController().updateCharts();

            BusyDialogHelper.close();
        }
    },

    _storecurrentYearModel: function (jsonmodel)
    {
        sap.ui.getCore().byId("App").setModel(jsonmodel, "currentYear");
    },

    _storepreviousYearModel: function (jsonmodel)
    {
        sap.ui.getCore().byId("App").setModel(jsonmodel, "previousYear");
    },

    _loadMockJsonFileModelCallback: function ()
    {
        var app = sap.ui.getCore().byId("App");

        //modelo
        var currentYearModel = new sap.ui.model.json.JSONModel();
        currentYearModel.loadData("mock/currentYear.json", '', false);
        this._storecurrentYearModel(currentYearModel);

        var previousYearModel = new sap.ui.model.json.JSONModel();
        previousYearModel.loadData("mock/previousYear.json", '', false);
        this._storepreviousYearModel(previousYearModel);

        if(!app.getModel("configuration"))
        {
            ConfigurationService.loadModel();
        }
        else
        {
            BulletChartHelper.buildGauge({
                controlId: "bulletsOverview"
            });
            
            sap.ui.getCore().byId("OverviewClock").getController().updateCharts();

            BusyDialogHelper.close();
        }
    },

    _loadMockJsonFileModel: function() {
        setTimeout(jQuery.proxy(this._loadMockJsonFileModelCallback, this), 500);
    },

    loadModel: function ()
    {
        BusyDialogHelper.open("Descargando", "DescargandoResumenLogistica");
        if (LogisticsService._jsonMode)
            this._loadMockJsonFileModel();
        else
        	this._loadODataModel();
    },

    _readODataOnError: function(error)
    {
        //manejo de errores
        MessageBoxHelper.onError("Error","asd","add");
    }
};