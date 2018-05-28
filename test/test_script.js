intent_handler = function (intent) {
    if (typeof (intent.action) === "string"
            && intent.action === "android.intent.action.MAIN") {
        // 沒有要檢索的東西，回家吧。
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
            window.open(encodeURIComponent(_search_items[0]), "_system");    
        }
        else {
            var _url = "https://www.google.com/search?q=" + encodeURIComponent(_search_items.join(" "));
            window.open(_url, "_system");    
        }
    }
    navigator.app.exitApp();
};