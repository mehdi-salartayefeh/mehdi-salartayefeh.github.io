//ssbind created by mehdi salartayefeh
//it is like angularjs but easier and lighter and better
//renamed to jsBind at 2022

function ss_inputChanges(){
    document.querySelectorAll('input[id]').forEach(function (input) {
        window[input.id] = input.value;
        input._onchange = input.onchange;
        input.onchange = ss_updateit;
        input.onkeyup = ss_updateit;
    });
}

function  ss_update() {
    window[this.id] = this.value;

    document.querySelectorAll('[jsfor]').forEach(function (obj) {
        let ssfor = obj.getAttribute('jsfor');
        //delete pre created
        if(obj.hasAttribute('jsbind'))
            obj.setAttribute('jsbind', obj.getAttribute('jsbind').replace(/\[0\]/g,'[jsIndex]'));
        document.querySelectorAll('[_jsfor="'+ssfor+'"]').forEach(function(el){el.remove()});
        ssfor = eval(ssfor);

        if(typeof ssfor == "number") {
            var _oH = obj.outerHTML;
            let oH = "";
            for (let i = 0; i < ssfor; i++) {
                oH += _oH.replace(/jsIndex/g, i).replace(/jsfor/g , (i>0) ? '_jsfor': 'jsfor');
            }
            obj.outerHTML = oH;
        } else if(Array.isArray(ssfor)) {
            let _oH = obj.outerHTML;
            let oH = "";
            for (let i = 0; i < ssfor.length; i++) {
                oH += _oH.replace(/jsIndex/g, i).replace(/jsfor/g , (i>0) ? '_jsfor': 'jsfor');
            }
            obj.outerHTML = oH;
        }
    });

    window[this.id] = this.value;
    ss_inputChanges();
    document.querySelectorAll('[jsbind]').forEach(function (obj) {
        let ssbinds = obj.getAttribute('jsbind').split(",");
        for (let b = 0; b < ssbinds.length; b++) {
            let ssbind = ssbinds[b];
            let attr = ssbind.split(":")[0].trim();
            let expr = ssbind.substr(ssbind.indexOf(':')+1);
//                Object.assign(this, $$.data);
            let _val = eval(expr);

//                if(obj.hasAttribute("ssfor"))

            if(attr=='value')
                obj.value = _val;
            else if(attr=='text')
                obj.innerText = _val;
            else if(attr.startsWith('style.'))
                obj.style[attr.substr(attr.indexOf('.')+1)] = _val;
            else
                obj.setAttribute(attr, _val);
        }
    })
}

function ss_updateit(xbj) {
    window[this.id] = this.value;

    var xid = xbj.id || this.id || xbj;
    document.querySelectorAll('[jsfor='+xid+']').forEach(function (obj) {
        let ssfor = obj.getAttribute('jsfor');
        //delete pre created
        if(obj.hasAttribute('jsbind'))
            obj.setAttribute('jsbind', obj.getAttribute('jsbind').replace(/\[0\]/g,'[jsIndex]'));
        document.querySelectorAll('[_jsfor="'+ssfor+'"]').forEach(function(el){el.remove()});
        ssfor = eval(ssfor);

        if(typeof ssfor == "number") {
            var _oH = obj.outerHTML;
            let oH = "";
            for (let i = 0; i < ssfor; i++) {
                oH += _oH.replace(/jsIndex/g, i).replace(/jsfor/g , (i>0) ? '_jsfor': 'jsfor');
            }
            obj.outerHTML = oH;
        } else if(Array.isArray(ssfor)) {
            let _oH = obj.outerHTML;
            let oH = "";
            for (let i = 0; i < ssfor.length; i++) {
                oH += _oH.replace(/jsIndex/g, i).replace(/jsfor/g , (i>0) ? '_jsfor': 'jsfor');
            }
            obj.outerHTML = oH;
        }
    });

    window[this.id] = this.value;

    document.querySelectorAll('[jsbind*='+xid+']').forEach(function (obj) {
        let ssbinds = obj.getAttribute('jsbind').split(",");
        for (let b = 0; b < ssbinds.length; b++) {
            let ssbind = ssbinds[b];
            let attr = ssbind.split(":")[0].trim();
            let expr = ssbind.substr(ssbind.indexOf(':')+1);
//                Object.assign(this, $$.data);
            let _val = eval(expr);

//                if(obj.hasAttribute("ssfor"))

            if(attr=='value')
                obj.value = _val;
            else if(attr=='text')
                obj.innerText = _val;
            else if(attr.startsWith('style.'))
                obj.style[attr.substr(attr.indexOf('.')+1)] = _val;
            else
                obj.setAttribute(attr, _val);
        }
    })
}

ss_inputChanges();
ss_update()
