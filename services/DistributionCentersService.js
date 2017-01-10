jQuery.sap.declare("Logistics.services.DistributionCentersService.js");

DistributionCentersService.js = {

	_jsonMode: false,
    _destinationView: null,

    _storeModel: function (jsonmodel)
    {
        sap.ui.getCore().byId("App").setModel(jsonmodel, "costCenters");
    },
    
    _loadServiceODataModel: function (supplierCode)
    {
        //llama a servicio
        var odataModel = new sap.ui.model.odata.ODataModel(ProxyHelper.getUrl(LogisticsService._sServiceUrl), true);

        odataModel.read("/PlantSet", {
            //urlParameters: '$top=20&$select=Name2,Pernr',
            success: jQuery.proxy(this._readODataOnSuccess, this),
            error: jQuery.proxy(this._readODataOnError, this)
        });
    },
    
    _readODataOnSuccess: function(data, result)
    {

    	var jsonModel = new sap.ui.model.json.JSONModel();
    	jsonModel.setData({
    		CostCentersSet: data.results
    	});

        CostCentersService._storeModel(jsonModel);
        LogisticsService.loadModel();
    },
    
    _readODataOnError: function(error)
    {
    	BusyDialogHelper.close();

        try {
            var errorMessage = $(error.response.body).find("message").text();
        }
        catch(err) {
        }

        if(!errorMessage)
        {
            try {
                errorMessage = JSON.parse(error.response.body).error.message.value;
            }
            catch(err) {
            }
        }

        var errorMessage2 = error.message;

        var errorShowed = errorMessage ? errorMessage : errorMessage2;

        MessageBoxHelper.onError("Error", errorMessage2, errorShowed);
    },

    _loadMockJsonFileModelCallback: function ()
    {
        //modelo
        var oModel = new sap.ui.model.json.JSONModel();
        oModel.loadData("mock/costCenters.json", '', false);
        this._storeModel(oModel);
        //busy
        BusyDialogHelper.close();
    },

    _loadMockJsonFileModel: function() {
        setTimeout(jQuery.proxy(this._loadMockJsonFileModelCallback, this), 500);
    },

    loadModel: function (destinationView)
    {
        CostCentersService._destinationView = destinationView;
        BusyDialogHelper.open("Descargando", "BuscandoDatosCentrosCosto");
        if(CostCentersService._jsonMode)
        	CostCentersService._loadMockJsonFileModel();
        else
        	CostCentersService._loadServiceODataModel();
    }

};