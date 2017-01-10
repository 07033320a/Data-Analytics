jQuery.sap.declare("Logistics.views.Overview.OverviewCompare.CompareChartHelper");

var CompareChartHelper = {

    _chartControlId: "chartCompare",
    _chart: null,
    _currentTransformation: null,
    _currentChartTypeIndex: 0,
    _chartTypes: ["line", "bar", "area-spline"],

    transformChart: function ()
    {
        //setea proximo chart
        var chartIndex = (CompareChartHelper._currentChartTypeIndex + 1) % CompareChartHelper._chartTypes.length;
        CompareChartHelper._currentChartTypeIndex = chartIndex;
        //transformacion
        var chartType = CompareChartHelper._chartTypes[chartIndex];
        jQuery.each(CompareChartHelper._chart.data(), function (index, column)
        {
            var columnId = column.id;
            CompareChartHelper._chart.transform(chartType, columnId);
        });
    },

    buildChart: function ()
    {
        if(CompareChartHelper._currentTransformation)
            clearInterval(CompareChartHelper._currentTransformation);

        sap.ui.getCore().byId("btnPlayPause").setSrc(FormatterHelper.getPath() + "/img/black/pause.png");

        CompareChartHelper._lblMontos = i18nTranslationHelper.getTranslation("Monto");
        CompareChartHelper._lblPorcentaje = i18nTranslationHelper.getTranslation("Porcentaje");
        //crea chart
        CompareChartHelper._chart = c3.generate({
            bindto: document.getElementById(CompareChartHelper._chartControlId),
            data: {
                x: "x",
                columns: [
		            ["x", ""]
		            //["DatosFicticios, 0"]
                ],
                types: {
                    Enviadas: CompareChartHelper._chartTypes[CompareChartHelper._currentChartTypeIndex],
                    Vendidas: CompareChartHelper._chartTypes[CompareChartHelper._currentChartTypeIndex]
                }
            },
            grid: {
                x: {
                    show: true
                },
                y: {
                    show: true
                }
            },
            zoom: {
                enabled: true
            },
            axis: {
                x: {
                    type: "category"
                },
                y: {
                    min: 0,
                    label: {
                        text: "$",
                        position: "outer-middle"
                    }
                }
            },
            color: {
                pattern: ["#4F93AA"]
            },
            transition: {
                duration: 1000
            }
        });
    },

    updateData: function ()
    {
        if (!CompareChartHelper._chart) {
            return;
        }
        //verifica modelo
        var model = sap.ui.getCore().byId("App").getModel("periods");
        if (!model)
            return;
        //toma datos
        var periods = model.getData().PeriodsSet;
        //carga vectores
        var monthPrefixes = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
        var xData = ["x"];
        var periodsData = [sap.ui.getCore().byId("selectKPI").getSelectedItem().getText()];

        for (var i = 0; i < periods.length; ++i)
        {
            var month = i18nTranslationHelper.getTranslation(monthPrefixes[periods[i].Month]);
            var year = periods[i].Year;
            xData.push(month + " " + year);

            periodsData.push(periods[i].Value);
        }
        columns = [
            xData,
            periodsData
        ];
        //actualiza chart
        setTimeout(function () { 
            CompareChartHelper._chart.load({
                columns: columns
            });
        }, 1000);
        setTimeout(function () {
            CompareChartHelper._chart.resize();
        }, 2000);

        //transformaciones
        CompareChartHelper.startTransformation();
    },

    startTransformation: function()
    {
        var interval = setInterval(function () {
            CompareChartHelper.transformChart();
        }, 5000);

        CompareChartHelper._currentTransformation = interval;
    }

};