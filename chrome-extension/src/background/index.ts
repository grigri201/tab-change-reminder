import 'webextension-polyfill';
import { exampleThemeStorage } from '@extension/storage';

exampleThemeStorage.get().then(theme => {
  console.log('theme', theme);
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'setIcon') {
    chrome.action.setIcon({ path: request.path, tabId: sender.tab?.id });
  }
});

console.log('Background loaded');
console.log("Edit 'chrome-extension/src/background/index.ts' and save to reload.");
