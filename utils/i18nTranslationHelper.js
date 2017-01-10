jQuery.sap.declare("Logistics.utils.i18nTranslationHelper");

i18nTranslationHelper = {

    currentLanguage: undefined,
        
    languages: {
        "english" : {
            "locale" : "en-EN",
            "icon" : "english.png"
        },
        "spanish" : {
            "locale" : "es-ES",
            "icon" : "spanish.png"
        }
    },

    initi18nModel: function(iLocale)
    {
        if(!i18nTranslationHelper.currentLanguage)
            i18nTranslationHelper.currentLanguage = i18nTranslationHelper.languages.spanish;

        var app = sap.ui.getCore().byId("App");
        if(!app.getModel("i18n") || iLocale)
        {
            if(iLocale)
            {
                var i18nModel = new sap.ui.model.resource.ResourceModel({
                    bundleUrl: "i18n/i18n.properties",
                    bundleLocale: iLocale
                });

                app.setModel(i18nModel, "i18n");

                var currentsView = sap.ui.getCore().byId("viewsBox").getItems();
                
                for(var i in currentsView)
                    currentsView[i].rerender();

                BusyDialogHelper.close();
            }
            else
            {
                var i18nModel = new sap.ui.model.resource.ResourceModel({
                    bundleUrl: "i18n/i18n.properties"
                });

                app.setModel(i18nModel, "i18n");
            }
        }
    },
    
    getTranslation: function(i18nMessage) {
        var app = sap.ui.getCore().byId("App");
        if(!app.getModel("i18n"))
            i18nTranslationHelper.initi18nModel();

        var i18nModel = app.getModel("i18n");

        var translation = i18nModel.getResourceBundle().getText(i18nMessage);
        if (translation)
            return translation;
        return i18nMessage;
    },

    onChangeLanguage: function(oEvent) {
        BusyDialogHelper.open();
        
        var btn = sap.ui.getCore().byId("btnSwitch");
        var btnOpenLang = sap.ui.getCore().byId("btnOpen");
        
        var mainUrl = FormatterHelper.getPath() + "/img/";
        var selectedLang = btn.getSrc().replace(mainUrl, '').split(".")[0];
        
        var prevLang = i18nTranslationHelper.currentLanguage;
        
        i18nTranslationHelper.currentLanguage = i18nTranslationHelper.languages[selectedLang];
        
        $("#languageBox div").fadeOut(function(){
            btn.setSrc(FormatterHelper.getPath() + "/img/" + prevLang.icon);
            btnOpenLang.setSrc(FormatterHelper.getPath() + "/img/" + i18nTranslationHelper.currentLanguage.icon);
            
            i18nTranslationHelper.initi18nModel(i18nTranslationHelper.currentLanguage.locale);
            
            $("#languageBox div:first-child").fadeIn();
        });
    }
    
};