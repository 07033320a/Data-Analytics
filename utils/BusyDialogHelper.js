jQuery.sap.includeStyleSheet("css/busy_loading.css");

jQuery.sap.declare("Logistics.utils.BusyDialogHelper");

BusyDialogHelper = {

    _busyDialog: null,

    _getBusyDialog: function () {
        if (!this._busyDialog)
            this._busyDialog = new sap.m.BusyDialog();
        return this._busyDialog;
    },

    open: function(i18nTitle, i18nMessage) {
        var t = (i18nMessage) ? i18nTitle : i18nTranslationHelper.getTranslation("Descargando");
        var m = (i18nMessage) ? i18nMessage : i18nTitle;
        m = i18nTranslationHelper.getTranslation(m);
        var busyDialog = this._getBusyDialog();
        busyDialog.setTitle(t);
        busyDialog.setText(m);
        busyDialog.open();
    },

    close: function() {
        this._getBusyDialog().close();
    }
};