ready = function () {
    try {
        window.plugins.intent.setNewIntentHandler(function (intent) {}, function (e) {});

        window.plugins.intent.getCordovaIntent(function (intent) {
            try {
                intent_handler(intent);
            } catch (e) {
                alert(e);
                navigator.app.exitApp();
            }
        });
    } catch (e) {
        alert("ready fail: " + e);
    }
};

intent_handler = function (intent) {
    //alert("可以嗎？");
    if (typeof (intent.action) === "string"
            && intent.action === "android.intent.action.MAIN") {
        // 沒有要檢索的東西，回家吧。
        //alert("空空");
        navigator.app.exitApp();
    }

    var _search_items = [];
    
    var _has_string = function (_item) {
        return (typeof(_item) === "string"
                && _item.trim() !== "");
    };
    
    if (typeof (intent.extras) === "object") {
        var _extras = intent.extras;
        if (_has_string(_extras["android.intent.extra.SUBJECT"])) {
            _search_items.push(_extras["android.intent.extra.SUBJECT"].trim());
        }
        if (_has_string(_extras["android.intent.extra.TEXT"])) {
            _search_items.push(_extras["android.intent.extra.TEXT"].trim());
        }
    }
    
    if (_search_items.length > 0) {
        if (_search_items.length === 1
                && (_search_items[0].startsWith("http://") || _search_items[0].startsWith("https://"))) {
            //alert(encodeURIComponent(_search_items[0]));
            window.open(_search_items[0], "_system");    
        }
        else {
            var _url = "https://www.google.com/search?q=" + encodeURIComponent(_search_items.join(" "));
            window.open(_url, "_system");    
        }
    }
    //alert([JSON.stringify(_search_items)
    //    , _search_items.length === 1
    //    , _search_items[0].startsWith("http://") 
    //    , _search_items[0].startsWith("https://")]);
    navigator.app.exitApp();
};