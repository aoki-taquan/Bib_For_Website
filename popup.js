chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
    let activeTab = tabs[0];
    let Title = activeTab.title;
    let Url = activeTab.url;
    let key = create_key(Title);
    let bib = create_bib(Title, Url, key);
    copyToClipboard(bib);

});

function copyToClipboard(text) {
    let textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

function create_key(str) {
    // スペースと記号を削除
    str = str.replace(/[\s\W]/g, '');
    // 先頭から五文字だけを抜き出す
    let result = str.slice(0, 5);
    // ランダムな二桁の数字を生成して追加
    let randomNumber = Math.floor(Math.random() * 100); // 0から99までのランダムな整数
    result += randomNumber.toString().padStart(2, '0');
    result += ":online"
    return result
}

function create_bib(Title, Url, key) {
    let today = new Date();
    return `@misc{${key},
  author       = {},
  title        = {${Title}},
  howpublished = {\\break \\url{${Url}}},
  month        = {},
  year         = {},
  note         = {(${new Date().toLocaleDateString("en-US", {month: "2-digit",day: "2-digit",year: "numeric"  })} 閲覧)}
}`
}

chrome.runtime.sendMessage({})