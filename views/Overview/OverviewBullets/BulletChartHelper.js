jQuery.sap.require("Logistics.views.Overview.OverviewBullets.bullet");
jQuery.sap.includeStyleSheet("views/Overview/OverviewBullets/bullet.css");
jQuery.sap.declare("Logistics.views.Overview.OverviewBullets.BulletChartHelper");

var BulletChartHelper = {

    getMax: function(jump, firstVal, secVal, thirdVal)
    {
        var top = Math.max(Math.max(firstVal, secVal), thirdVal);
        var init = jump;

        while(init < top)
            init += jump;

        return init;
    },

    //options con estos valores controlId, value, lowThreshold, highThreshold, min, max, maximizeAscending, percentage
    buildGauge: function (options)
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
        var bulletData = [
            {
                "title": i18nTranslationHelper.getTranslation("CostoXM3"),
                "subtitle": i18nTranslationHelper.getTranslation("$XM3Transportado"),
                "ranges": [BulletChartHelper.getMax(100, targets.CostoMt3TranspTarget * 1.1, currentYear.CostoMt3Transp, previousYear.CostoMt3Transp), targets.CostoMt3TranspTarget * 1.1, targets.CostoMt3TranspTarget * 0.9],
                "measures": [currentYear.CostoMt3Transp, previousYear.CostoMt3Transp],
                "markers": [targets.CostoMt3TranspTarget],
                "reverse": true
            },
            //CostoLogisticoVentas*
            {
                "title": i18nTranslationHelper.getTranslation("CostoLogisticoVentas"),
                "subtitle": "",
                "ranges": [targets.CostoLogisticoTarget * 0.9, targets.CostoLogisticoTarget * 1.1, BulletChartHelper.getMax(1, targets.CostoLogisticoTarget * 1.1, currentYear.CostoLogistico, previousYear.CostoLogistico)],
                "measures": [currentYear.CostoLogistico, previousYear.CostoLogistico],
                "markers": [targets.CostoLogisticoTarget]
            },
            //Cobertura*
            {
                "title": i18nTranslationHelper.getTranslation("Cobertura"),
                "subtitle": "",
                "ranges": [targets.CoberturaTarget * 0.9, targets.CoberturaTarget * 1.1, BulletChartHelper.getMax(1, targets.CoberturaTarget * 1.1, currentYear.Cobertura, previousYear.Cobertura)],
                "measures": [currentYear.Cobertura, previousYear.Cobertura],
                "markers": [targets.CoberturaTarget]
            },
            //Gastos*
            {
                "title": i18nTranslationHelper.getTranslation("Gastos"),
                "subtitle": "%",
                "ranges": [targets.GastosXVentasTarget * 0.9, targets.GastosXVentasTarget * 1.1, BulletChartHelper.getMax(1, targets.GastosXVentasTarget * 1.1, currentYear.GastosXVentas, previousYear.GastosXVentas)],
                "measures": [currentYear.GastosXVentas, previousYear.GastosXVentas],
                "markers": [targets.GastosXVentasTarget],
                "reverse": true
            }
        ];

        //arma dimension
        var margin = {top: 5, right: 40, bottom: 20, left: 200},
        width = 960 - margin.left - margin.right,
        height = 70 - margin.top - margin.bottom;

        //crea chart
        var chart = d3.bullet()
            .width(width)
            .height(height);

        //limpia estructura
        $("#" + options.svgControlId).empty();
        //crea elementos SVG
        var svg = d3.select("#" + options.controlId).selectAll("svg")
            .data(bulletData)
            .enter().append("svg")
            .attr("class", "bullet")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
            .call(chart);

        var title = svg.append("g")
            .style("text-anchor", "end")
            .attr("transform", "translate(-6," + height / 2 + ")");

        title.append("text")
            .attr("class", "title")
            .text(function (d) { return d.title; });

        title.append("text")
            .attr("class", "subtitle")
            .attr("dy", "1em")
            .text(function (d) { return d.subtitle; });
    }
	
};