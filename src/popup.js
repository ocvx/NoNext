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
// cross browser support
let CBrowser = {
  queryTabs: function(query, cb) {
    if (chrome) {
      chrome.tabs.query(query, cb);
    } else {
      browser.tabs.query(query).then(cb);
    }
  },
  sendMsg: function(tabID, msg, cb) {
    if (chrome) {
      chrome.tabs.sendMessage(tabID, msg, cb);
    } else {
      browser.tabs.sendMessage(tabID, msg).then(cb);
    }
  },
  storageSet: function(kv, cb) {
    if (chrome) {
      chrome.storage.local.set(kv, cb);
    } else {
      browser.storage.local.set(kv).then(cb);
    }
  },
  storageGet: function(keys, cb) {
    if (chrome) {
      chrome.storage.local.get(keys, cb);
    } else {
      browser.storage.local.get(keys).then(cb);
    }
  },
  setIcon: function(icons) {
    (chrome || browser).browserAction.setIcon({path: icons})
  }
};
/** @type HTMLInputElement */
let cb = document.getElementById('cb');
const isChrome = /chrome/i.test(navigator.userAgent);

function onCBChanged() {
  console.log(cb.checked);
  CBrowser.queryTabs({}, function(tabs) {
    tabs.forEach(tab => {
      CBrowser.sendMsg(
          tab.id, {settings: {on: cb.checked}}, function(response) {
            console.log(response);
          });
    });
  });
  CBrowser.storageGet('settings', (items) => {
    let settings = items.settings || {};
    settings.on = cb.checked;
    CBrowser.storageSet({settings}, () => {
      console.log('Settings set to: ', settings);
    });
  });
  CBrowser.setIcon(cb.checked ? iconsOn : iconsOff, () => {
    console.log('icons set to ', cb.checked);
  })
}
document.addEventListener('DOMContentLoaded', function() {
  let slider = document.querySelector('.slider');

  CBrowser.storageGet('settings', (items) => {
    let settings = items.settings || {};
    cb.checked = settings.on !== false;
    setTimeout(() => slider.classList.add('init'), 400);
  });
  cb.onchange = onCBChanged;
});

if (location.pathname.indexOf('options.html') >= 0) {
  (chrome || browser)
      .runtime.onMessage.addListener(function(msg, sender, sendResponse) {
        console.log('msg:', msg, sender);
        // if it's not from options.html - return
        if (sender.tab) {
          return;
        }
        if (msg.settings && typeof msg.settings.on === 'boolean') {
          cb.checked = msg.settings.on;
        }
      });
}
