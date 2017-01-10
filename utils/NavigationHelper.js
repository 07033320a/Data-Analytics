jQuery.sap.declare("Logistics.utils.NavigationHelper");

NavigationHelper = {

    _appId: "app",
    _app: null,

    _getApp: function ()
    {
        return sap.ui.getCore().byId(this._appId);
    },

    _views: [],

    _pageIsMaster: function (pageId)
    {
        return (pageId.match(/Master$/) != null);
    },

    _getPageName: function (pageId)
    {
        var pageParts = pageId.split(".");
        return pageParts[pageParts.length - 1];
    },

    _getPageInstance: function (pageId, pageName)
    {
        var isMaster = this._pageIsMaster(pageId);
        //verifica si ya instancio esa pagina
        var view = this._views[pageName];
        if (!view)
        {
            //creates view
            view = sap.ui.jsview(pageName, pageId);
            //agrega vista a listado de vistas creadas
            this._views[pageName] = view;
            //adds view to split app
            this._getApp().addPage(view, isMaster);
        }
        return view;
    },

    //options: objeto con pageId, context, model, transitionName
    to: function (options)
    {
        var pageName = this._getPageName(options.pageId);
        //gets view
        var view = this._getPageInstance(options.pageId, pageName);
        //modelo
        if (options.model)
        {
            view.setModel(options.model);
        }
        //contexto
        if (options.context)
        {
            view.setBindingContext(options.context);
        }
        //navigates
        this._getApp().to(pageName, options.transitionName);
    },

    toChart: function(chart)
    {
        if(chart != ViewHelper.currentChart)
        {
            var currentView = ViewHelper.getCurrentView();
            currentView.destroyContent();

            currentView.addContent(sap.ui.jsview(chart, ViewHelper.getChartViewName(ViewHelper.currentView, chart)));
            NavigationHelper.setHash(ViewHelper.currentView + "_" + chart);
        }
    },

    destroyPage: function (pageId)
    {
        var view = this._views[pageId];
        //destruye vista
        view.destroy();
        //remueve elemento de array de vistas
        delete this._views[pageId];
    },

    back: function (pageName, destroy)
    {
        //pagina actual
        var currentPageId = this._getApp().getCurrentPage().getId();
        //back
        this._getApp().backToPage(pageName);
        //se fija si debe eliminar la pagina actual
        if (destroy)
            this.destroyPage(currentPageId);
    }
};