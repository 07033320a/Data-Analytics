sap.ui.controller("Logistics.views.Main.Main", {

	onInit: function ()
	{
		ViewHelper.initViewModel();
	},

	onAfterRendering: function()
	{
		LogisticsService.loadModel();
	},

	onChangePeriod: function(evt)
	{
		LogisticsService.loadModel();
	},

	onChangeChart: function(evt)
    {
        var customData = evt.getSource().getCustomData();
        
        var currentViews = sap.ui.getCore().byId("viewsBox").getItems();
        for(var cv in currentViews)
        	for(var cd in customData)
        		if (customData[cd].getValue() == currentViews[cv].getId())
        			return false;

        var viewsBox = sap.ui.getCore().byId("viewsBox");

        $("#viewsBox").hide("fade", function(){
            viewsBox.destroyItems();

            for(var cd in customData)
            {
				if(customData[cd].getValue() == "OverviewCompare")
					sap.ui.getCore().byId("dateInputMonth").setEnabled(false);
				else
					sap.ui.getCore().byId("dateInputMonth").setEnabled(true);

				if(customData[cd].getValue() != "OverviewTable")
					sap.ui.getCore().byId("downloadExcelBox").setVisible(false);

                var view = new sap.ui.jsview(customData[cd].getValue(), customData[cd].getKey());
                viewsBox.addItem(view);

                var navChartMenu = sap.ui.getCore().byId("navChartMenu");
                if(customData[cd].getValue().indexOf("OverviewTable") > -1)
                {
                    if(!navChartMenu.hasStyleClass("lowOpacity"))
                        navChartMenu.addStyleClass("lowOpacity");
                }
                else
                {
                    if(navChartMenu.hasStyleClass("lowOpacity"))
                        navChartMenu.removeStyleClass("lowOpacity");
                }
            }
            setTimeout(function(){
                $("#viewsBox").show("fade");
            },20);
        });
    },

    onClickNavChartMenu: function()
    {
        var navChartMenu = sap.ui.getCore().byId("navChartMenu");
        var buttons = $("#navChartMenu img");
        //quito el ultimo botón que abre y cierra el menu
        buttons.splice(buttons.length - 1,1);

        if(!navChartMenu.hasStyleClass("expanded"))
        {
            navChartMenu.addStyleClass("expanded");
            ViewHelper.fadeInControls(buttons)
        }
        else
        {
            navChartMenu.removeStyleClass("expanded");
            ViewHelper.fadeOutControls(buttons,500)
        }
    },

	onClickFilter: function()
	{
		var currentYear = (new Date()).getFullYear();
		var filtersBox = new sap.m.VBox({
			items: [
				new sap.m.HBox({
					justifyContent: sap.m.FlexJustifyContent.SpaceAround,
					alignItems: sap.m.FlexAlignItems.Center,
					items: [
						new sap.m.Text({text: "{i18n>Year}"}),
						new sap.m.Select({
							id: "yearCombo"
						}).addStyleClass("rounded")
					]
				}),
				new sap.m.HBox({
					justifyContent: sap.m.FlexJustifyContent.SpaceAround,
					alignItems: sap.m.FlexAlignItems.Center,
					items: [
						new sap.m.Text({text: "{i18n>Subsidiary}"}),
						new sap.m.Select({
							id: "subsidiaryCombo"
						}).addStyleClass("rounded")
					]
				})
			]
		});

		var yearCombo = sap.ui.getCore().byId("yearCombo");

		yearCombo.addItem(new sap.ui.core.Item({text: currentYear, key: currentYear}));
		yearCombo.addItem(new sap.ui.core.Item({text: currentYear - 1, key: currentYear - 1}));
		yearCombo.addItem(new sap.ui.core.Item({text: currentYear - 2, key: currentYear - 2}));

		MessageBoxHelper.showCustomDialog("Filters",filtersBox);
	},
	
	onExportToExcel: function(oEvent) {
		ExcelExportHelper.openSeparatorDialog();
	},

	onLanguageMenuClick: function(oEvent) {
		var secBtn = $("#languageBox div:nth-child(2)");
		var visible = secBtn.css('display') == 'none';
		if(!visible)
			secBtn.fadeOut();
		else
			secBtn.fadeIn();
	}
});