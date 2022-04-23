window.addEventListener('DOMContentLoaded', () => {
    selectNewLineByOs();
    setCaret();
    document.getElementById('help').addEventListener('click', (e)=>{
        document.getElementById('help-dialog').showModal();
    });
    document.getElementById('help-dialog').addEventListener('open', (e)=>{
        document.getElementById('close-help-dialog').focus();
    });
    document.getElementById('help-dialog').addEventListener('close', (e)=>{
        document.getElementById('content').focus();
    });
    document.getElementById('download').addEventListener('click', (e)=>{
        downloadFile(new Blob(createContent(), {type: 'text/plain'}), createName());
    });
    document.getElementById('copy').addEventListener('click', (e)=>{
        Clipboard.copy(replaceNewLine());
    });
    document.getElementById('content').addEventListener('keydown', (e)=>{
             if (e.code == 'Enter' && e.ctrlKey) { downloadFile(new Blob(createContent(), {type: 'text/plain'}), createName()); }
        else if (e.code == 'Enter' && e.shiftKey) { Clipboard.copy(replaceNewLine()); }
        else if (e.code == 'Tab') { document.getElementById('help').focus(); e.preventDefault(); }
    });
    document.getElementById('close-help-dialog').addEventListener('keydown', (e)=>{
        if (e.code == 'Tab') { e.preventDefault(); }
    });
});
function setCaret() {
    const ta = document.getElementById('content');
    ta.setSelectionRange(ta.value.length, ta.value.length);
}
function selectNewLineByOs() {
    const options = document.getElementById('newline').options;
    const LF = 0;
    const CR = 1;
    const CRLF = 2;
    const ua = window.navigator.userAgent.toLowerCase();
    console.log(ua)
    if (ua.indexOf('windows nt') !== -1) { options[CRLF].selected = true; }
    else if (ua.indexOf('mac os x') !== -1) { options[CR].selected = true; } // MacOS
    else if (ua.indexOf('iphone') !== -1) { options[CR].selected = true; } // iOS
    else if (ua.indexOf('android') !== -1) { options[LF].selected = true; }
    // Linux,  CrOS = Chrome OS（Raspberry PI OS）、ゲーム機（PlayStation 5, PlayStation Vita, Nintendo WiiU, Nintendo Switch, Nintendo 3DS, Xbox）
    else { options[LF].selected = true; }
}
function createName() { return document.getElementById('name').value || 'index.html'; }
function createContent() {
    const content = []
    if (document.getElementById('bom').checked) { content.push(new Uint8Array([0xEF, 0xBB, 0xBF])); console.debug('BOM'); }
    content.push(replaceNewLine())
    console.debug(content)
    return content
}
function replaceNewLine() {
    const content = document.getElementById('content').value;
    switch (document.getElementById('newline').value) {
        case 'LF': return content;
        case 'CR': return content.replace(/\r\n|\n|/g, "\r");
        case 'CR-LF': return content.replace(/\r|\n/g, "\r\n/");
        default: return content;
    }
}
function downloadFile(blob, fileName) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.download = fileName;
    a.href = url;
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

