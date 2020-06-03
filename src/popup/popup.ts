import './popup.scss';
const openStore = document.getElementById('openStore');
console.log(111);

chrome.storage.sync.get('color', (data) => {
  // changeColor.style.backgroundColor = data.color;
  // changeColor.setAttribute('value', data.color);
});

openStore.onclick = (element) => {

  const button = <HTMLInputElement> element.target;
  let color = button.value;
  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    alert(tabs[0]);
  });
  // chrome.tabs.getCurrent((tab) => {
  //   alert(tab);
  //   // chrome.tabs.remove(tab.id, function() {});
  // });

  // chrome.runtime.openOptionsPage();
  // chrome.tabs.query({
  //   active: true,
  //   currentWindow: true
  // }, (tabs) => {
  //   chrome.tabs.executeScript(
  //       tabs[0].id,
  //       {code: 'document.body.style.backgroundColor = "' + color + '";'});
  // });
};
