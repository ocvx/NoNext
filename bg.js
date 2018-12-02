const iconsOn = {
  '16': 'icons-on/icon.16.png',
  '48': 'icons-on/icon.48.png',
  '128': 'icons-on/icon.128.png'
};
const iconsOff = {
  '16': 'icons-off/icon.16.png',
  '48': 'icons-off/icon.48.png',
  '128': 'icons-off/icon.128.png'
};
function storageGet(keys, cb) {
  if (chrome) {
    chrome.storage.local.get(keys, cb);
  } else {
    browser.storage.local.get(keys).then(cb);
  }
}
function setIcon(icons) {
  (chrome || browser).browserAction.setIcon({path: icons})
}


// set the right icon
storageGet('settings', (items) => {
  let {settings} = items;
  setIcon(settings.on !== false ? iconsOn : iconsOff);
});



// close the background page once we're done (works only on Chrome).
// the delay is meant to give the browser time to set the icon - 5s is more than
// enough.
setTimeout(window.close, 5000)