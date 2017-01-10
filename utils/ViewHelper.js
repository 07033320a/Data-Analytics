jQuery.sap.declare("Logistics.utils.ViewHelper");

ViewHelper = {

    currentView : null,
    currentChart: null,
    jsonModeEnabled: true,

    initViewModel: function(){

        ViewHelper.currentView = "Overview";
        ViewHelper.currentChart = "bullets";
    },

    fadeInControls: function(array, fnOnFinish)
    {
        for(var i = 0; i < array.length; i++)
        {
            var obj = sap.ui.getCore().byId(array[i].id);
            obj.removeStyleClass("invisible");
        }

        setTimeout(function(){
            for(var i = 0; i < array.length; i++)
            {
                var obj = sap.ui.getCore().byId(array[i].id);
                obj.removeStyleClass("noOpacity");
            }

            if(fnOnFinish)
                fnOnFinish();
        },20);
    },

    fadeOutControls: function(array, time, fnOnFinish)
    {
        for(var i = 0; i < array.length; i++)
        {
            var obj = sap.ui.getCore().byId(array[i].id);
            obj.addStyleClass("noOpacity");
        }

        setTimeout(function(){
            for(var i = 0; i < array.length; i++)
            {
                var obj = sap.ui.getCore().byId(array[i].id);
                obj.addStyleClass("invisible");
            }

            if(fnOnFinish)
                fnOnFinish();
        },time);
    },

    clearAllIntervals: function() {
        for (var i = 1; i < 99999; i++)
            window.clearInterval(i);
    }
};