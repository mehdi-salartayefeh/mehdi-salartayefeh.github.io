/**
 * jspages: a tiny library for easy page navigation in a SPA (Single Page Application)
 * version: beta
 * created by Mehdi Salartayefeh
 *
 * each navigation has an attribute named "jspage"
 * by clicking a navigation, add "active" class to it automatically and div by attribute "jspage-target" loaded
 * attribute "jspage-load-json" is url to load into a variable with name "jspage-load-json-var"
 * attribute "jspage-load-after" is a javascript which run by eval
 * attribute "jspage-load-before" is a javascript which run by eval
 * page by address page
 * @version .2.1.1
 *
 * change logs:
 * @changelist
 * @fix Attach a delegated event handler
 */

console.log('jspages.js loaded');

var lastPageMethod = function () {

};
var lastjspage = "";
var jspageback = null;
var jspage_group = {};


var jspageinit = function (z) {
    $(z).find("[jspage-load]").each(function (index) {
        var _thispage = $(this);
        var url = _thispage.attr("jspage-load");
        _thispage.html("<u>Loading ...</u>");

        var before = _thispage.attr("jspage-load-before");
        if(before){
            if(!window[before]()) return;
        }

        //!window[jspage] means call function by name jspage
        _thispage.load(url,function () {
            var after = _thispage.attr("jspage-load-after");
            if(after){
                try {
                    eval(after);
                } catch (e){
                    console.error('z2',e);
                }
            }
            jspageinit(this);
        })
    });

    $(z).find("[jspage-load-json]").each(function (index) {
        var _thispage = $(this);
        load_jspage(_thispage);
    });


    if(z.jspageinited){
        console.log('inited before..............')
        return;
    }
    // Attach a delegated event handler
    $(z).on("click","[jspage]",function (event) {
        console.log('new jspage click');
        var jspage = $(this).attr("jspage");
        var after = $(this).attr("jspage-load-after");
        var group = $(this).attr("jspage-group");
        jspageback = $(this).attr("jspage-back");
        var before = $(this).attr("jspage-load-before");
        if(typeof before !== 'undefined'){
            if(window[before]())
                show_jspage(jspage, after, null, group);
        } else {
            show_jspage(jspage, after, null, group);
        }
        lastjspage = jspage;
        return false;
    });

    z.jspageinited = true;
};
jspageinit(document);

var jspageLocked = false;

function jspageLock() {
    jspageLocked = true;
}

function jspageUnlock() {
    jspageLocked = false;
}

const jspages_cache = {};
function show_jspage(jspage, after, target, group) {
    /*if(jspage===lastjspage){
        return;
    }*/

    if(jspageLocked){
        console.warn('jspage is Locked');
        return;
    }

    if(group){
        jspage_group[jspage] = group;
    } else {
        group = jspage_group[jspage];
    }


    let jspagetarget = $(target || "[jspage-target]");


    if(!jspage) jspage = localStorage.getItem("jspage");

    if(!jspage) return;

    localStorage.setItem("jspage",jspage);

    jspagetarget.html(/*"<u>Loading page "+(jspage || '')+" ...</u>"+*/
        `<div class="page-loader-wrapper" style='position: relative; z-index: inherit; height: 70vh'>
    <div class="loader">
            <div class="preloader">
                <div class="spinner-layer pl-red">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div>
                    <div class="circle-clipper right">
                        <div class="circle"></div>
                    </div>
                </div>
            </div>
            <p>Please wait...</p>
        </div></div>`);

    //!window[jspage] means call function by name jspage
    jspagetarget.load(jspage,function () {
        /*lastPageMethod = window[jspage];
        if(lastPageMethod)
            lastPageMethod();

        if (jQuery.browser.mobile) {
            console.log("Mobile Mode");
        }*/

        if(after){
            try {
                eval(after);
            } catch (e) {
                console.error('z1',e);
            }
        }

        jspageinit(this);
    });

    //new method with cache
    /*if(jspages_cache.hasOwnProperty(jspage)){
        jspagetarget.html(jspages_cache[jspage]);

        if(after){
            try {
                eval(after);
            } catch (e) {
                console.error('z1',e);
            }
        }

        jspageinit(this);
    } else {
        $.ajax({
            url: jspage,
//            async: !1,
            type: "get",
            cache: false,
            // dataType: "json",
            success: function (response) {
                jspages_cache[jspage] = response;

                jspagetarget.html(response);

                if (after) {
                    try {
                        eval(after);
                    } catch (e) {
                        console.error('z1', e);
                    }
                }

                jspageinit(this);

                // swal.fire("IABT", "Voucher with id \"" + voucher_id + "\" imported successfully.", "success", {closeOnClickOutside: false});
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.error(xhr, ajaxOptions, thrownError);
                try {
                    JL().fatal(thrownError + " - " + ajaxOptions);
                } catch (e) {

                }
            }
        }).fail(function (response) {
            swal.fire("Error", response.responseJSON.message, "error");
        });
    }
    */

    //set active ss menu
    $('[jspage].active').each(function () {
        var thisgroup = $(this).attr("jspage-group");
        if(thisgroup) {
            if (group && thisgroup === group) {
                $(this).removeClass("active");
            }
        } else {
            $(this).removeClass("active");
        }

    });

    $('[jspage="'+jspage+'"]').each(function () {
        $(this).addClass("active");
    });

    if(!window.history.state) {
        window.history.pushState({}, '');
    }
}

function load_jspage(_thispage, url, cb) {
    if(!url)
        url = _thispage.attr("jspage-load-json");

    //replace some url vars
    if (url.includes('jspagesearch')) {
        url = url.replace(/\[jspagesearch\.(\w+)\]/, function (match, p1) {
            if (!localStorage.getItem("jspage")) return '';
            return (new URLSearchParams(localStorage.getItem("jspage").split('?')[1])).get(p1) || '';
        });
    }

    var varname = _thispage.attr("jspage-load-json-var");
    var before = _thispage.attr("jspage-load-before");
    if(before){
        if(!window[before]()) return;
    }
    $.getJSON(url, function (json) {
        window[varname] = json;

        var after = cb || _thispage.attr("jspage-load-after");
        if (after) {
            try {
                if(typeof after === 'function'){
                    after()
                }else{
                    eval(after);
                }
            } catch (e) {
                console.error('z3', e);
            }
        }
    });
}

window.show_jspage = show_jspage;

show_jspage();


//handle back button
window.addEventListener('load', function() {
    window.history.pushState({}, '')
})

var onclose = false;
window.addEventListener('popstate', function() {
    if(window.location.hash){
        console.log('hash', window.location.hash)
        // return;
    }
    if(jspageback){
        window.history.pushState({}, '');
        show_jspage(jspageback);
        jspageback = null;
    }
})


