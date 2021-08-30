let ok = 0;
let notok = 0;

function okcount() {
    document.getElementById('ok-num').innerHTML = ++ok;
    updatebar(); //updates bar every click
}

function notokcount() {
    document.getElementById('nk-num').innerHTML = ++notok;
    updatebar(); //updates bar every click
}

function updatebar() {
    total = ok + notok;
    document.getElementById("okay").style.width = ((ok / total) * 100).toFixed() + "%";
    console.log(((ok / total) * 100).toFixed() + "%");
    console.log(total);
}