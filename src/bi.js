window.varClickTracking = 1;
var eciTPUrl = "https://xxxxx.cn-beijing.log.aliyuncs.com/logstores/your-store/track.gif?APIVersion=0.6.0";

function eCaiBiInit() {
    eCaiBiSetEvents();
    eCaiBiSendPageView();
}

function eCaiBiSendPageView() {
    eCaiBiResetArrays();
    var pageViewType = 0;
    eCaiBiSetSharedData(pageViewType);
    eci["eci.et"] = pageViewType;
    eCaiBiBeacon();
}

function eCaiBiSetEvents() {
    if (window.varClickTracking != undefined && varClickTracking == 1 && document.body) {
        if (document.body.addEventListener) {
            var clickEvent = navigator.appVersion.indexOf("MSIE") != -1 ? "click" : "mousedown";
            document.body.addEventListener(clickEvent, window.eCaiBiProcessClick, 0)
        } else {
            document.body.attachEvent && document.body.attachEvent("onclick", window.eCaiBiProcessClick)
        }
    }
}

function eCaiBidecode(n) {
    var t = decodeURIComponent(n.replace("/+/g", " "));
    return t.indexOf('"') == 0 && (t = t.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\")), t
}

function eCaiBiGetCookieKeyValue(cookieName, key) {
    var cookieValue = eCaiBiGetCookie(cookieName),
        paramInCookieValue, i, param;
    if (cookieValue != undefined)
        paramInCookieValue = cookieValue.split("&");
    for (i = 0; i < paramInCookieValue.length; i++) {
        param = paramInCookieValue[i].split("=");
        if (key == param[0]) return param[1];
    }
    return null
}

function eCaiBiGetCookie(name) {
    var cooks = document.cookie.split("; ");
    for (var i = 0; i < cooks.length; i++) {
        var keyValue = cooks[i].split("=");
        var key = eCaiBidecode(keyValue.shift());
        if (key == name) {
            return eCaiBidecode(keyValue.join("="))
        }
    }
    return null

}

function eCaiBiGetCookieValue(name) {
    var cooks = document.cookie.split("; ");
    for (var i = 0; i < cooks.length; i++) {
        var keyValue = cooks[i].split("=");
        var key = eCaiBidecode(keyValue.shift());
        if (key == name) {
            return eCaiBidecode(keyValue)
        }
    }
    return null

}

function eCaiBiResetArrays() {
    eci = [], na = [], ec = []
}

function eCaiBiIsInList(tag) {
    for (var t in eciCE)
        if (eciCE[t] == tag.toUpperCase()) return true;
    return false;
}

function eCaiBiReadElementTags(element) {
    var attr, name, lowerCaseName;
    if (element) {
        for (attr in element.attributes)
            if (attr != undefined && element.attributes[attr] != null && element.attributes[attr] != undefined) {
                name = element.attributes[attr].name;
                if (name != null && name != undefined) {
                    lowerCaseName = name.toLowerCase();
                    if (lowerCaseName.indexOf("ec.") == 0) {
                        ec[name] = element.attributes[attr].value;
                    }

                }

            }
        return ""
    }
}

function eCaiBiReadAllTags(element) {
    while (element && element != "undefined") eCaiBiReadElementTags(element), element = element.parentElement || element.parentNode
}

function eCaiBiGetId(element) {
    return element ? element.id == undefined ? "" : element.id : ""
}

function eCaiBiEncode(n) {
    return typeof encodeURIComponent == "function" ? encodeURIComponent(n) : escape(n)
}


function eCaiBiInitMeta() {
    var n, i, t, r;
    if (document.all ? n = document.all.tags("meta") : document.documentElement && (n = document.getElementsByTagName("meta")), metaTags = "", typeof n != "undefined")
        for (i = 0; i < n.length; i++) t = n.item(i), t.name && (r = t.name.toLowerCase(), r.indexOf("ec.") == 0 && (ec[t.name] = t.content))
}

function eCaiBiGetStrFromArray(n) {
    var i = "", t;
    for (t in n) n.hasOwnProperty(t) && (i += n[t] != undefined ? "&" + eCaiBiEncode(t) + "=" + eCaiBiEncode(n[t]) : "&" + eCaiBiEncode(t) + "=");
    return i
}

function eCaiBiBeacon() {
    var url, eciPart, normalizedUrl;
    try {
        url = [];
        url.push(eciTPUrl);
        eCaiBiInitMeta();
        eciPart = eCaiBiGetStrFromArray(eci);
        url.push(eciPart);
        url.push(eCaiBiGetStrFromArray(ec));
        url.push(eCaiBiGetStrFromArray(na));
        normalizedUrl = url.join("");
        normalizedUrl.length > 2048 ? normalizedUrl = normalizedUrl.substring(0, 2038) + "&eci.tr=1" : normalizedUrl += "&eci.tr=0";
        if (document.images) {
            eciIAr[eciIArI] = new Image;
            eciIAr[eciIArI].src = normalizedUrl;
            eciIArI++
        } else {
            document.write('<IMG ALT="" BORDER="0" NAME="bImg" WIDTH="1" HEIGHT="1" SRC="' + normalizedUrl + '"/>')
        }
    } catch (r) {
    }
}

function eCaiBiSetTimeZoneOffSet() {
    var n = 420,
        t = new Date;
    n = t.getTimezoneOffset();
    eci["eci.tz"] = n / -60;
}

function eCaiBiSetTitle() {
    eci["eci.ti"] = document.title;
}

function eCaiBiSetCot(type) {
    eci["eci.cot"] = type != undefined ? type : "";
}

function eCaiBiSetTimeStamp() {
    var n = new Date,
        t = n.getTime();
    eci["eci.ts"] = t.toString()
}

function eCaiBiSetReferrer() {
    var n = document.referrer;
    n != null && n != "" && (eci["eci.r"] = n)
}

function eCaiBiSetEventId() {
    eci["eci.eid"] = GenerateGuid();
}

function eCaiBiSetUserAgent() {
    eci["eci.ua"] = navigator.userAgent;
}

function GenerateGuid() {
    return GuidPart() + GuidPart() + "-" + GuidPart() + "-" + GuidPart() + "-" + GuidPart() + "-" + GuidPart() + GuidPart() + GuidPart()
}

function GuidPart() {
    return ((1 + Math.random()) * 65536 | 0).toString(16).substring(1)
}

function eCaiBiSetScreenResolution() {
    typeof screen == "object" && (eci["eci.sr"] = screen.width + "x" + screen.height)
}

function eCaiBiGetBrowserSize() {
    document.body.clientWidth != undefined ? eci["eci.bs"] = document.body.clientWidth + "x" + document.body.clientHeight : document.documentElement && document.documentElement.clientWidth != undefined ? eci["eci.bs"] = document.documentElement.clientWidth + "x" + document.documentElement.clientHeight : window.innerWidth != undefined && (eci["eci.bs"] = window.innerWidth + "x" + window.innerHeight)
}

function eCaiBiSetUid() {
    eci["eci.uid"] = eCaiBiGetCookie('ewUserId');
}

function eCaiBiSetSid() {
    eci["eci.sid"] = eCaiBiGetCookie('ewSiteId');
}

function eCaiBiSetSeid() {
    eci["eci.seid"] = eCaiBiGetCookie('ewBiSession');
}

function eCaiBiSetAuid() {
    eci["eci.auid"] = eCaiBiGetCookie('ewAUID');
}

function eCaiBiGetCurrentSD() {
    eci["eci.rsd"] = window.location.host;
    eci["eci.rsus"] = window.location.pathname != "" ? window.location.pathname : "";
    eci["eci.rsqs"] = window.location.search != "" ? window.location.search + window.location.hash : "";
    eci["eci.rihs"] = window.location.protocol == "https" || window.location.protocol == "https:" ? "1" : "0";
}


function eCaiBiSetSharedData(content) {
    eCaiBiSetSid();
    eCaiBiSetSeid();
    eCaiBiSetUid();
    eCaiBiSetAuid();
    eCaiBiSetTimeZoneOffSet();
    eCaiBiSetCot(content);
    eCaiBiSetTimeStamp();
    eCaiBiSetReferrer();
    eCaiBiSetEventId();
    eCaiBiSetScreenResolution();
    eCaiBiGetBrowserSize();
    eCaiBiSetTitle();
    eCaiBiGetCurrentSD();
    eCaiBiSetUserAgent();
}


function eCaiBiProcessClick(srcEvent) {
    var event, element, content, elementType, contentText, value, form, fieldIndex, formType;
    eCaiBiResetArrays(), eci["eci.et"] = 2;
    try {
        if (event = srcEvent || window.event, event) {
            for (element = event.srcElement || event.target; element.tagName && eCaiBiIsInList(element.tagName) == 0;) {
                element = element.parentElement || element.parentNode
            }
        }
        if (element && element.tagName) {
            switch (element.tagName) {
                case "A":
                    var textLinkClickType = 1;
                    eCaiBiSetSharedData(textLinkClickType);
                    eCaiBiReadAllTags(element);
                    content = document.all ? element.innerText || element.innerHTML : element.text || element.innerHTML;
                    eci["eci.cn"] = content;
                    eci["eci.cid"] = eCaiBiGetId(element);
                    eci["eci.ct"] = element.href ? element.href : "";
                    eCaiBiBeacon();
                    break;
                case "IMG":
                    var imageLinkClickType = 2;
                    eCaiBiSetSharedData(imageLinkClickType);
                    eCaiBiReadAllTags(element);
                    eci["eci.cn"] = element.alt ? element.alt : "";
                    eci["eci.cid"] = eCaiBiGetId(element);
                    eci["eci.ct"] = eCaiBiGetImageHREF(element);
                    eCaiBiBeacon();
                    break;
                case "AREA":
                    var imageAreaClickType = 3;
                    eCaiBiSetSharedData(imageAreaClickType);
                    eCaiBiReadAllTags(element);
                    eci["eci.cn"] = element.alt ? element.alt : "";
                    eci["eci.cid"] = eCaiBiGetId(element);
                    eci["eci.ct"] = element.href ? element.href : "";
                    eCaiBiBeacon();
                    break;
                case "INPUT":
                case "BUTTON":
                    var inputClickType = 4;
                    eCaiBiSetSharedData(inputClickType);
                    eCaiBiReadAllTags(element);
                    elementType = element.type || "";
                    contentText = "";
                    if (elementType && (elementType == "button" || elementType == "reset" || elementType == "submit" || elementType == "image") || elementType == "text" || elementType == "tel") {
                        value = element.value || element.name || element.alt || element.id || element.innerText;
                        eci["eci.cn"] = value ? value : "";
                        eci["eci.cid"] = eCaiBiGetId(element);
                        if (element.form) {
                            eci["eci.ct"] = element.form.action || window.location.pathname;
                            form = element.form.elements;
                            fieldIndex = 1
                            for (var i = 0; i < form.length; i++) {
                                formType = form[i].type;
                                if (formType == "text" || formType == "tel") {
                                    contentText += "&eci.t" + fieldIndex + "=" + eCaiBiEncode(form[i].name || form[i].id) + "&eci.v" + fieldIndex + "=" + eCaiBiEncode(form[i].value);
                                    fieldIndex++;
                                }
                            }
                        }
                        else {
                            eci["eci.ct"] = window.location.pathname
                        }
                        eci["eci.ctx"] = contentText != "" ? contentText : ""

                    }
                    eCaiBiBeacon()
            }
        }
    } catch (t) {
    }
}

var eciIAr = [],
    eciIArI = 0,
    eciCE = ["A", "IMG", "AREA", "INPUT", "BUTTON"],
    eci = [],
    na = [],
    ec = [],
    vs = 4;

eCaiBiInit()