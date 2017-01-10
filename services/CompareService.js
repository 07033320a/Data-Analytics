jQuery.sap.declare("Logistics.services.CompareService");

CompareService = {

    _jsonMode: true,
    _destinationView: null,
    _sServiceUrl: "/sap/opu/odata/sap/Z_LOGISTICS_DASHBOARD_SRV/",
    _sLogisticsReportModelId: "CompareReportModel",

    _storeModel: function (jsonmodel)
    {
        sap.ui.getCore().byId("App").setModel(jsonmodel, "periods");
    },

    _getModel: function () {
        return new sap.ui.model.odata.ODataModel(ProxyHelper.getUrl(this._sServiceUrl), true);
    },

    _loadMockJsonFileModelCallback: function ()
    {
        //modelo
        var oModel = new sap.ui.model.json.JSONModel();
        oModel.loadData("mock/compare.json", '', false);
        this._storeModel(oModel);
        //busy

        CompareChartHelper.buildChart();
        CompareChartHelper.updateData();

        BusyDialogHelper.close();
    },

    _loadODataModel: function()
    {
        var model = CompareService._getModel();

        var dateFrom = sap.ui.getCore().byId("dateFrom").getDateValue();
        var dateTo = sap.ui.getCore().byId("dateFrom").getDateValue();

        if(dateFrom > dateTo)
        {
            var dateTo = sap.ui.getCore().byId("dateFrom").getDateValue();
            var dateFrom = sap.ui.getCore().byId("dateFrom").getDateValue();
        }

        odataModel.read("/CompareSet(PlantCode='N002',DateFrom='" + dateFrom + "',DateTp='" + dateTo + "')", {
            //urlParameters: '$top=20&$select=Name2,Pernr',
            success: jQuery.proxy(this._readODataOnSuccess, this),
            error: jQuery.proxy(this._readODataOnError, this)
        });
    },

    _loadMockJsonFileModel: function() {
        setTimeout(jQuery.proxy(this._loadMockJsonFileModelCallback, this), 500);
    },

    loadModel: function ()
    {
        BusyDialogHelper.open("Descargando", "DescargandoResumenLogistica");
        if (CompareService._jsonMode)
            this._loadMockJsonFileModel();
        else
            this._loadODataModel();
    }

};