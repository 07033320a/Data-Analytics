jQuery.sap.declare("Logistics.services.ConfigurationService");

ConfigurationService = {
	
	_jsonMode: true,
	_sServiceUrl: "/sap/opu/odata/sap/Z_LOGISTICS_DASHBOARD_SRV/",
	_sLogisticsReportModelId: "LogisticsReportModel",
    _parameters: ["CostoXKMFlotaDoubleStar", "CostoXKMFlotaPropia", "CostoXKMTractorTerc", "Sucursales",
                  "CoberturaTarget", "CostoLogisticoTarget", "CostoMt3TranspTarget", "GastosXVentasTarget"],

    _getModel: function () {
        return new sap.ui.model.odata.ODataModel(ProxyHelper.getUrl(this._sServiceUrl), true);
    },

    saveData: function(index)
    {
        if(index >= ConfigurationService._parameters.length)
            return ConfigurationService._onSaveFinish();

        var configModel = sap.ui.getCore().byId("App").getModel("configuration");

        var key = ConfigurationService._parameters[index];
        if(configModel.getData().Originals[key] != configModel.getData().Parameters[key])
        {
            var entry = {
                "Key": ConfigurationService._parameters[index],
                "Value": configModel.getData().Parameters[key]
            };

			if(!ConfigurationService._jsonMode)
	            ConfigurationService._getModel().create("/ParameterSet", entry, {
	                //urlParameters: '$top=20&$select=Name2,Pernr',
	                success: jQuery.proxy(this.saveData, this, index + 1),
	                error: jQuery.proxy(this._readODataOnError, this)
	            });
	        else
	        	ConfigurationService.saveData(index + 1);
        }
        else
            ConfigurationService.saveData(index + 1);
    },

    _onSaveFinish: function()
    {
    	var configuration = sap.ui.getCore().byId("App").getModel("configuration").getData();
    	configuration.Originals =  jQuery.extend(true, {}, configuration.Parameters);
    	
        BusyDialogHelper.close();
        MessageBoxHelper.showMessageToast("CambiosGuardados");
    },

	_loadODataModel: function()
	{
        var odataModel = ConfigurationService._getModel();

        var year = sap.ui.getCore().byId("dateInputMonth").getDateValue().getFullYear();

        odataModel.read("/ParameterSet", {
            //urlParameters: '$top=20&$select=Name2,Pernr',
            success: jQuery.proxy(this._readODataOnSuccess, this),
            error: jQuery.proxy(this._readODataOnError, this)
        });
	},

    _readODataOnSuccess: function(data, response)
    {
        var app = sap.ui.getCore().byId("App");

        var parameters = {};
        for(var i in data.results)
            parameters[data.results[i].Key] = data.results[i].Value;

        var jsonModel = new sap.ui.model.json.JSONModel();
        jsonModel.setData({
            Parameters: parameters,
            Originals: jQuery.extend(true, {}, parameters)
        });
        app.setModel(jsonModel, "configuration");

        if(sap.ui.getCore().byId("OverviewBullets"))
    	{
        	BulletChartHelper.buildGauge({
                controlId: "bulletsOverview"
            });
        	sap.ui.getCore().byId("OverviewClock").getController().updateCharts();
    	}

        BusyDialogHelper.close();
    },

    _loadMockJsonFileModel: function() {
        setTimeout(jQuery.proxy(this._loadMockJsonFileModelCallback, this), 500);
    },

    _loadMockJsonFileModelCallback: function()
    {
        var app = sap.ui.getCore().byId("App");

        //modelo
        var configurationModel = new sap.ui.model.json.JSONModel();
        configurationModel.loadData("mock/configuration.json", '', false);

        var jsonModel = new sap.ui.model.json.JSONModel();
        jsonModel.setData({
            Parameters: configurationModel.getData().parameters,
            Originals: jQuery.extend(true, {}, configurationModel.getData().parameters)
        });
        app.setModel(jsonModel, "configuration");

		if(sap.ui.getCore().byId("OverviewBullets"))
    	{
        	BulletChartHelper.buildGauge({
                controlId: "bulletsOverview"
            });
        	sap.ui.getCore().byId("OverviewClock").getController().updateCharts();
    	}

        BusyDialogHelper.close();
    },

    loadModel: function ()
    {
        BusyDialogHelper.open("Descargando", "DescargandoResumenLogistica");
        if (ConfigurationService._jsonMode)
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