jQuery.sap.require("Logistics.views.Overview.OverviewClock.gauge");
jQuery.sap.declare("Logistics.views.Overview.OverviewClock.ClockGaugeHelper");

var ClockGaugeHelper = {
	
    _buildConfig: function (options)
    {
        return {
            size: 120,
            label: options.label,
            min: undefined != options.min ? options.min : 0,
            max: undefined != options.max ? options.max : 100,
            minorTicks: 5
        };
    },
	
    //options con estos valores controlId, label, value, lowThreshold, highThreshold, min, max, maximizeAscending
    buildGauge: function (options)
    {
        //arma config
        var config = this._buildConfig(options);

        //rangos
        var range = config.max - config.min;
        config.yellowZones = [{
            from: (options.maximizeAscending) ? options.lowThreshold : options.highThreshold,
            to: (options.maximizeAscending) ? options.highThreshold : options.lowThreshold
        }];
        config.redZones = [{
            from: (options.maximizeAscending) ? options.highThreshold : options.min,
            to: (options.maximizeAscending) ? options.max : options.highThreshold
        }];

        //arma gauge
        $("#" + options.controlId).empty();
        var gauge = new Gauge(options.controlId, config);
        gauge.render();
        gauge.redraw(options.value);
    }
	
};