/**
 * sspages: a tiny library for easy page navigation in a SPA (Single Page Application)
 * version: beta
 * created by Mehdi Salartayefeh
 *
 * each navigation has an attribute named "sspage"
 * by clicking a navigation, add "active" class to it automatically and div by attribute "sspage-target" loaded
 * attribute "sspage-load-json" is url to load into a variable with name "sspage-load-json-var"
 * attribute "sspage-load-after" is a javascript which run by eval
 * attribute "sspage-load-before" is a javascript which run by eval
 * page by address page
 * @version .2.1.1
 *
 * change logs:
 * @changelist
 * @fix Attach a delegated event handler
 */

console.log('sspages.js loaded');

var lastPageMethod = function () {

};
var lastsspage = "";
var sspageback = null;
var sspage_group = {};


var sspageinit = function (z) {
    $(z).find("[sspage-load]").each(function (index) {
        var _thispage = $(this);
        var url = _thispage.attr("sspage-load");
        _thispage.html("<u>Loading ...</u>");

        var before = _thispage.attr("sspage-load-before");
        if(before){
            if(!window[before]()) return;
        }

        //!window[sspage] means call function by name sspage
        _thispage.load(url,function () {
            var after = _thispage.attr("sspage-load-after");
            if(after){
                try {
                    eval(after);
                } catch (e){
                    console.error('z2',e);
                }
            }
            sspageinit(this);
        })
    });

    $(z).find("[sspage-load-json]").each(function (index) {
        var _thispage = $(this);
        load_sspage(_thispage);
    });


    if(z.sspageinited){
        console.log('inited before..............')
        return;
    }
    // Attach a delegated event handler
    $(z).on("click","[sspage]",function (event) {
        console.log('new sspage click');
        var sspage = $(this).attr("sspage");
        var after = $(this).attr("sspage-load-after");
        var group = $(this).attr("sspage-group");
        sspageback = $(this).attr("sspage-back");
        var before = $(this).attr("sspage-load-before");
        if(typeof before !== 'undefined'){
            if(window[before]())
                show_sspage(sspage, after, null, group);
        } else {
            show_sspage(sspage, after, null, group);
        }
        lastsspage = sspage;
        return false;
    });

    z.sspageinited = true;
};
sspageinit(document);

var sspageLocked = false;

function sspageLock() {
    sspageLocked = true;
}

function sspageUnlock() {
    sspageLocked = false;
}

const sspages_cache = {};
function show_sspage(sspage, after, target, group) {
    /*if(sspage===lastsspage){
        return;
    }*/

    if(sspageLocked){
        console.warn('sspage is Locked');
        return;
    }

    if(group){
        sspage_group[sspage] = group;
    } else {
        group = sspage_group[sspage];
    }


    let sspagetarget = $(target || "[sspage-target]");


    if(!sspage) sspage = localStorage.getItem("sspage");

    if(!sspage) return;

    localStorage.setItem("sspage",sspage);

    sspagetarget.html(/*"<u>Loading page "+(sspage || '')+" ...</u>"+*/
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

    //!window[sspage] means call function by name sspage
    sspagetarget.load(sspage,function () {
        /*lastPageMethod = window[sspage];
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

        sspageinit(this);
    });

    //new method with cache
    /*if(sspages_cache.hasOwnProperty(sspage)){
        sspagetarget.html(sspages_cache[sspage]);

        if(after){
            try {
                eval(after);
            } catch (e) {
                console.error('z1',e);
            }
        }

        sspageinit(this);
    } else {
        $.ajax({
            url: sspage,
//            async: !1,
            type: "get",
            cache: false,
            // dataType: "json",
            success: function (response) {
                sspages_cache[sspage] = response;

                sspagetarget.html(response);

                if (after) {
                    try {
                        eval(after);
                    } catch (e) {
                        console.error('z1', e);
                    }
                }

                sspageinit(this);

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
    $('[sspage].active').each(function () {
        var thisgroup = $(this).attr("sspage-group");
        if(thisgroup) {
            if (group && thisgroup === group) {
                $(this).removeClass("active");
            }
        } else {
            $(this).removeClass("active");
        }

    });

    $('[sspage="'+sspage+'"]').each(function () {
        $(this).addClass("active");
    });

    if(!window.history.state) {
        window.history.pushState({}, '');
    }
}

function load_sspage(_thispage, url, cb) {
    if(!url)
        url = _thispage.attr("sspage-load-json");

    //replace some url vars
    if (url.includes('sspagesearch')) {
        url = url.replace(/\[sspagesearch\.(\w+)\]/, function (match, p1) {
            if (!localStorage.getItem("sspage")) return '';
            return (new URLSearchParams(localStorage.getItem("sspage").split('?')[1])).get(p1) || '';
        });
    }

    var varname = _thispage.attr("sspage-load-json-var");
    var before = _thispage.attr("sspage-load-before");
    if(before){
        if(!window[before]()) return;
    }
    $.getJSON(url, function (json) {
        window[varname] = json;

        var after = cb || _thispage.attr("sspage-load-after");
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

window.show_sspage = show_sspage;

show_sspage();


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
    if(sspageback){
        window.history.pushState({}, '');
        show_sspage(sspageback);
        sspageback = null;
    }
})


