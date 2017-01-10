jQuery.sap.declare("Logistics.utils.ExcelExportHelper");

ExcelExportHelper = {
		_save: function (exportCsv)
	    {
	        exportCsv.saveFile().always(function ()
	        {
	            this.destroy();
	        });
	    },
	    
	    openSeparatorDialog: function()
	    {
	        this._dialog = new sap.m.Dialog({
	            title: "{i18n>Confirmation}",
	            type: sap.m.DialogType.Message,
	            afterClose: function ()
	            {
	                this.destroy();
	            },
	            content: [
	                new sap.m.VBox({
	                    items: [
	                        new sap.m.HBox({
	                            alignItems: sap.m.FlexAlignItems.Center,
	                            items: [
	                                new sap.m.Text({ text: "{i18n>CsvSeparator}" }),
	                                new sap.m.ComboBox({
	                                    id: "cboSeparators",
	                                    selectedKey: ",",
	                                    items: [
	                                        new sap.ui.core.ListItem({ key: ";", text: "{i18n>SemiColon}(;)" }),
	                                        new sap.ui.core.ListItem({ key: ",", text: "{i18n>Comma}(,)" })
	                                    ]
	                                })
	                            ]
	                        }),
	                        new sap.m.FlexBox({
	                            justifyContent: sap.m.FlexJustifyContent.End,
	                            items: [
	                                new sap.m.Image({
	                                    src: FormatterHelper.getPath() + "/img/white/confirm.png",
	                                    press: [this.handleDownloadConfirm, this]
	                                }),
	                                new sap.m.Image({
	                                    src: FormatterHelper.getPath() + "/img/white/close.png",
	                                    press: [this.handleDownloadClose, this]
	                                })
	                            ]
	                        })
	                    ]
	                })
	            ],
	        }).addStyleClass("dialogCustom");
	        //setea modelos
	        this._dialog.setModel(sap.ui.getCore().byId("App").getModel("i18n"), "i18n");
	        this._dialog.open();
	    },

	    handleDownloadConfirm: function ()
	    {
	    	var targets = sap.ui.getCore().byId("App").getModel("configuration").getData().Parameters;
	    	var previousYear = sap.ui.getCore().byId("App").getModel("previousYear").getData();
	    	var currentYear = sap.ui.getCore().byId("App").getModel("currentYear").getData();
	    	
	    	//verifica si hay un separador
	        var separator = sap.ui.getCore().byId("cboSeparators").getSelectedKey();
	        if (!separator)
	        {
	            MessageBoxHelper.showAlert("Information", "NoSeparatorSelected");
	            return;
	        }
	        
	        var rows = [{
	        	c01: i18nTranslationHelper.getTranslation("CostoXM3"),
	        	c02: previousYear.CostoMt3Transp,
	        	c03: currentYear.CostoMt3Transp,
	        	c04: targets.CostoMt3TranspTarget
	        },
	        {
	        	c01: i18nTranslationHelper.getTranslation("CostoLogisticoVentas"),
	        	c02: previousYear.CostoLogistico,
	        	c03: currentYear.CostoLogistico,
	        	c04: targets.CostoLogisticoTarget
	        },
	        {
	        	c01: i18nTranslationHelper.getTranslation("Cobertura"),
	        	c02: previousYear.Cobertura,
	        	c03: currentYear.Cobertura,
	        	c04: targets.CoberturaTarget
	        },
	        {
	        	c01: i18nTranslationHelper.getTranslation("Gastos"),
	        	c02: previousYear.GastosXVentas,
	        	c03: currentYear.GastosXVentas,
	        	c04: targets.GastosXVentasTarget
	        }
	        ];
	    	
	      //columns
	        var columns = [
       			{ name: i18nTranslationHelper.getTranslation("Indicador"), template: { content: "{c01}" } },
       			{ name: i18nTranslationHelper.getTranslation("Previo"), template: { content: "{c02}" } },
       			{ name: i18nTranslationHelper.getTranslation("Resultado"), template: { content: "{c03}" } },
       			{ name: i18nTranslationHelper.getTranslation("Objetivo"), template: { content: "{c04}" } }
       		];

	        var jsonModel = new sap.ui.model.json.JSONModel();
	        jsonModel.setData({
	            Rows: rows
	        });
	        
	      //descarga a Excel
	      ExcelExportHelper.ExportModel(jsonModel, "/Rows", columns, separator);
	      //busy
	      this._dialog.close();
	    },
	    
	    handleDownloadClose: function ()
	    {
	        this._dialog.close();
	    },

	    //export de modelo
	    ExportModel: function(model, contextPath, columns, csvSeparator)
	    {
	        var oExport = new sap.ui.core.util.Export({
	            exportType: new sap.ui.core.util.ExportTypeCSV({
	                separatorChar: (csvSeparator) ? csvSeparator : ";"
	            }),
	            models: model,
	            rows: {
	                path: contextPath
	            },
	            columns: columns
	        });
	        //descarga
	        this._save(oExport);
	    }
}