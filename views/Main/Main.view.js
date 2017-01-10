sap.ui.jsview("Logistics.views.Main.Main", {

	getControllerName: function () {
	    return "Logistics.views.Main.Main";
	},
	
	createContent: function (oController) {
		var page = new sap.m.Page({
			id: "mainPage",
			footer: [
				new sap.m.Bar({
					contentMiddle: [
						new sap.m.HBox({
							id: "downloadExcelBox",
							visible: false,
							items: [
								new sap.m.Image({
									id: "btnDownloadExcel",
									height: "40px",
									src: FormatterHelper.getPath() + "/img/white/download.png",
									press: [oController.onExportToExcel,oController]
								})
							]
						})
					],
					contentRight: [
						new sap.m.HBox({
							id: "navChartMenu",
							items: [
								new sap.m.Image({
									id: "btnBullet",
									height: "40px",
									src: FormatterHelper.getPath() + "/img/white/bullet.png",
									press: [oController.onChangeChart,oController]
								}).addStyleClass("noOpacity").addStyleClass("invisible")
									.addCustomData(new sap.ui.core.CustomData({
										key: "Logistics.views.Overview.OverviewClock.OverviewClock",
										value: "OverviewClock"
									}))
									.addCustomData(new sap.ui.core.CustomData({
										key: "Logistics.views.Overview.OverviewBullets.OverviewBullets",
										value: "OverviewBullets"
									})),
								new sap.m.Image({
									id: "btnCompare",
									height: "40px",
									src: FormatterHelper.getPath() + "/img/white/compare.png",
									press: [oController.onChangeChart,oController]
								}).addStyleClass("noOpacity").addStyleClass("invisible")
									.addCustomData(new sap.ui.core.CustomData({
										key: "Logistics.views.Overview.OverviewCompare.OverviewCompare",
										value: "OverviewCompare"
									})),
								new sap.m.Image({
									id: "btnTable",
									height: "40px",
									src: FormatterHelper.getPath() + "/img/white/table.png",
									press: [oController.onChangeChart,oController]
								}).addStyleClass("noOpacity").addStyleClass("invisible")
									.addCustomData(new sap.ui.core.CustomData({
										key: "Logistics.views.Overview.OverviewTable.OverviewTable",
										value: "OverviewTable"
									})),
								new sap.m.Image({
									id: "btnConfig",
									height: "40px",
									src: FormatterHelper.getPath() + "/img/white/config.png",
									press: [oController.onChangeChart,oController]
								}).addStyleClass("noOpacity").addStyleClass("invisible")
									.addCustomData(new sap.ui.core.CustomData({
										key: "Logistics.views.Overview.OverviewConfig.OverviewConfig",
										value: "OverviewConfig"
									})),
								new sap.m.Image({
									id: "btnSwitchView",
									height: "40px",
									src: FormatterHelper.getPath() + "/img/white/charts.png",
									press: [oController.onClickNavChartMenu,oController]
								})
							]
						})
					]
				})
			],
		    headerContent: [
                new sap.m.Bar({
                    contentLeft: [
              			new sap.m.Text({ text: "{i18n>LogiscticsDashboard}" }).addStyleClass("appTitle")
		            ],
		            contentRight: [
						new sap.m.Text({
							text: "{i18n>Period}"
						}),
						new sap.m.DateTimeInput({
		                    id: "dateInputMonth",
		                    width: "40%",
		                    displayFormat: "yyyy",
		                    dateValue: new Date(),
		                    valueFormat: "yyyy",
							change: [oController.onChangePeriod, oController]
		                }),
		                new sap.m.VBox({
		                	id: "languageBox",
		                	items: [
								new sap.m.Image({
									id: "btnOpen",
									height: "40px",
									src: FormatterHelper.getPath() + "/img/spanish.png",
									press: [oController.onLanguageMenuClick,oController]
								}),
								new sap.m.Image({
									id: "btnSwitch",
									height: "40px",
									src: FormatterHelper.getPath() + "/img/english.png",
									press: [i18nTranslationHelper.onChangeLanguage,i18nTranslationHelper]
								})
                	        ]
		                })
		            ]
		        }).addStyleClass('mainBar')
		    ]
		});

		var viewsBox = new sap.m.VBox({
			id: "viewsBox",
			items: [
				sap.ui.jsview("OverviewClock", "Logistics.views.Overview.OverviewClock.OverviewClock"),
				sap.ui.jsview("OverviewBullets", "Logistics.views.Overview.OverviewBullets.OverviewBullets")
			]
		});

		page.addContent(viewsBox);
		return page;
	}
});