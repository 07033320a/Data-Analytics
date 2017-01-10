sap.ui.jsview("Logistics.views.Overview.OverviewTable.OverviewTable", {

	getControllerName: function () {
	    return "Logistics.views.Overview.OverviewTable.OverviewTable";
	},
	
	createContent: function (oController)
	{
	    var controls = [];

	    var table = new sap.m.Table({
	        id: "tblOverviewTable",
	        inset: false,
	        fixedLayout: false,
	        columns: [
                new sap.m.Column({ header: new sap.m.Text({ text: "{18n>Indicador}" }) }),
                new sap.m.Column({
                    header: new sap.m.Text({ text: "{i18n>Previo}" }),
                    hAlign: sap.ui.core.TextAlign.End
                }),
                new sap.m.Column({
                    header: new sap.m.Text({ text: "{i18n>Resultado}" }),
                    hAlign: sap.ui.core.TextAlign.End
                }),
                new sap.m.Column({
                    header: new sap.m.Text({ text: "{i18n>Objetivo}" }),
                    hAlign: sap.ui.core.TextAlign.End
                }),
	        ],
	        items: [
                new sap.m.ColumnListItem({
                    cells: [
                        new sap.m.Text({ text: "{i18n>CostoXM3}" }),
                        new sap.m.Text({ text: "{previousYear>/CostoMt3Transp}" }),
                        new sap.m.Text({
                            text: {
                                parts: [
                                    { path: "currentYear>/CostoMt3Transp" },
                                    { path: "configuration>/Parameters/CostoMt3TranspTarget" }
                                ],
                                formatter: function (value, target)
                                {
                                    if (value > target * 1.1)
                                    {
                                        //red
                                        this.removeStyleClass("numberYellow");
                                        this.removeStyleClass("numberGreen");
                                        this.addStyleClass("numberRed");
                                    }
                                    else if (value > target * 0.9)
                                    {
                                        //amarillo
                                        this.removeStyleClass("numberRed");
                                        this.removeStyleClass("numberGreen");
                                        this.addStyleClass("numberYellow");
                                    }
                                    else
                                    {
                                        //verde
                                        this.removeStyleClass("numberRed");
                                        this.removeStyleClass("numberYellow");
                                        this.addStyleClass("numberGreen");
                                    }
                                    return value;
                                }
                            }
                        }),
                        new sap.m.Text({ text: "{configuration>/Parameters/CostoMt3TranspTarget}" })
                    ]
                }),
                new sap.m.ColumnListItem({
                    cells: [
                        new sap.m.Text({ text: "{i18n>CostoLogisticoVentas}" }),
                        new sap.m.Text({ text: "{previousYear>/CostoLogistico}" }),
                        new sap.m.Text({
                            text: {
                                parts: [
                                    { path: "currentYear>/CostoLogistico" },
                                    { path: "configuration>/Parameters/CostoLogisticoTarget" }
                                ],
                                formatter: function (value, target)
                                {
                                	if (value > target * 1.1)
                                    {
                                        //red
                                        this.removeStyleClass("numberYellow");
                                        this.removeStyleClass("numberGreen");
                                        this.addStyleClass("numberRed");
                                    }
                                    else if (value > target * 0.9)
                                    {
                                        //amarillo
                                        this.removeStyleClass("numberRed");
                                        this.removeStyleClass("numberGreen");
                                        this.addStyleClass("numberYellow");
                                    }
                                    else
                                    {
                                        //verde
                                        this.removeStyleClass("numberRed");
                                        this.removeStyleClass("numberYellow");
                                        this.addStyleClass("numberGreen");
                                    }
                                    return value;
                                }
                            }
                        }),
                        new sap.m.Text({ text: "{configuration>/Parameters/CostoLogisticoTarget}" })
                    ]
                }),
                new sap.m.ColumnListItem({
                    cells: [
                        new sap.m.Text({ text: "{i18n>Cobertura}" }),
                        new sap.m.Text({ text: "{previousYear>/Cobertura}" }),
                        new sap.m.Text({
                            text: {
                                parts: [
                                    { path: "currentYear>/Cobertura" },
                                    { path: "configuration>/Parameters/CoberturaTarget" },
                                ],
                                formatter: function (value, target)
                                {
                                	if (value < target * 0.9 || value > target * 1.1)
                                    {
                                        //red
                                        this.removeStyleClass("numberYellow");
                                        this.removeStyleClass("numberGreen");
                                        this.addStyleClass("numberRed");
                                    }
                                    else
                                    {
                                        //verde
                                        this.removeStyleClass("numberRed");
                                        this.removeStyleClass("numberYellow");
                                        this.addStyleClass("numberGreen");
                                    }
                                    return value;
                                }
                            }
                        }),
                        new sap.m.Text({ text: "{configuration>/Parameters/CoberturaTarget}" })
                    ]
                }),
                new sap.m.ColumnListItem({
                    cells: [
                        new sap.m.Text({ text: "{i18n>Gastos}" }),
                        new sap.m.Text({ text: "{previousYear>/GastosXVentas}" }),
                        new sap.m.Text({
                            text: {
                                parts: [
                                    { path: "currentYear>/GastosXVentas" },
                                    { path: "configuration>/Parameters/GastosXVentasTarget" }
                                ],
                                formatter: function (value, target)
                                {
                                	if (value > target * 1.1)
                                    {
                                        //red
                                        this.removeStyleClass("numberYellow");
                                        this.removeStyleClass("numberGreen");
                                        this.addStyleClass("numberRed");
                                    }
                                    else if (value > target * 0.9)
                                    {
                                        //amarillo
                                        this.removeStyleClass("numberRed");
                                        this.removeStyleClass("numberGreen");
                                        this.addStyleClass("numberYellow");
                                    }
                                    else
                                    {
                                        //verde
                                        this.removeStyleClass("numberRed");
                                        this.removeStyleClass("numberYellow");
                                        this.addStyleClass("numberGreen");
                                    }
                                    return value;
                                }
                            }
                        }),
                        new sap.m.Text({ text: "{configuration>/Parameters/GastosXVentasTarget}" })
                    ]
                })
            ]
	    });
	    controls.push(table);

		return controls;
	}
});