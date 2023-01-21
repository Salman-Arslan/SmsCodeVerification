
function smsKodu(s) {

    this.Dom = s.dom;
    this.InputLength = s.InputLength == undefined ? 5 : s.InputLength;
    this.Time = s.Time == undefined ? 120 : s.Time;
    this.RegexPatern = s.RegexPatern == undefined ? '^[0-9]|[a-zA-z]$' : s.RegexPatern;
    this.AgainBtn = s.AgainBtn;
    this.notficTime = s.notficTime == undefined ? 3000 : s.notficTime;


    this.domg = document.getElementById(s.Dom);
    this.domg.classList.add('fieldset');
    var div;
    for (var i = 0; i < this.InputLength; i++) {

        if (i == 0) {
            div = document.createElement("div");
            div.className = 'fds';
            div.setAttribute('data-paten', this.RegexPatern)
        }
        var label = document.createElement("label");
        label.className = 'box';
        var input = document.createElement("input");
        input.className = 'field';
        input.placeholder = '';
        label.appendChild(input);
        input.addEventListener("input", handletxtPrcs);
        div.appendChild(label);
    }
    this.domg.appendChild(div);

    var pdiv = document.createElement("div");
    pdiv.className = 'prcs';

    var pce = document.createElement("div");
    pce.className = 'pce';
    var sspan = document.createElement("span");
    sspan.innerHTML = this.Time;
    pce.appendChild(sspan);

    pdiv.appendChild(pce);
    this.domg.appendChild(pdiv);
}

function handletxtPrcs({ target }) {
    const value = target.value.slice(0, 1);
    var req = new RegExp(target.parentNode.parentNode.getAttribute('data-paten'));
    if (req.test(value))
        target.value = value;
    else {
        target.value = "";
        if (value != '')
            return;
    }

    var curTxtIndex, txtAll = target.parentNode.parentNode.children;

    for (var i = 0; i < txtAll.length; i++)
        if (txtAll[i].firstElementChild == target)
            curTxtIndex = i


    if (value == '' && curTxtIndex != 0)
        txtAll[curTxtIndex - 1].focus();

    else if (curTxtIndex < txtAll.length - 1 && value != '') {
        curTxtIndex++;
        txtAll[curTxtIndex].focus();
    }
}

smsKodu.prototype.StartTime = function () {
    var prcs = this.domg.lastElementChild,
        pce = prcs.firstChild,
        span = pce.firstChild,
        sr = this.Time,
        r = (100 / sr);

    clearInterval(eclc);
    span.innerHTML = this.Time;
    prcs.style.visibility = 'visible';
    pce.style.width = '100%';

    var ts = this;
    var eclc = setInterval(function () {
        if (sr <= 0) {
            prcs.style.visibility = 'hidden';
            var tb = document.querySelector(ts.AgainBtn);
            if (tb != undefined)
                tb.removeAttribute('hidden');

            clearInterval(eclc);
            return;
        }
        pce.style.width = (sr * r) + "%";
        span.innerHTML = sr;
        sr = sr - 1;
    }, 1000);


}

smsKodu.prototype.Value = function () {
    var txt = '', q = this.domg.firstElementChild.children;
    for (var i = 0; i < q.length; i++)
        txt = txt.concat(q[i].firstElementChild.value)
    return txt;
}

smsKodu.prototype.NotficSuccess = function () {
    this.NotficClear();
    this.domg.firstElementChild.classList.add('animate-success');
    var q = this;
    setTimeout(function () {
        q.NotficClear();
    }, this.notficTime)
}

smsKodu.prototype.NotficFail = function () {
    this.NotficClear();
    this.domg.firstElementChild.classList.add('animate-failure');

    var q = this;
    setTimeout(function () {
        q.NotficClear();
    }, this.notficTime)
}

smsKodu.prototype.NotficClear = function () {
    this.domg.firstElementChild.classList.remove('animate-success');
    this.domg.firstElementChild.classList.remove('animate-failure');

}

smsKodu.prototype.ValueClear = function () {
    var q = this.domg.firstElementChild.children;
    for (var i = 0; i < q.length; i++)
        q[i].firstElementChild.value = '';
}

