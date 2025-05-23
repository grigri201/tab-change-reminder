import { sampleFunction } from '@src/sampleFunction';

console.log('content script loaded');

// Shows how to call a function defined in another module
sampleFunction();

if (location.hostname === 'chatgpt.com') {
  let timerId: number | null = null;
  const streamAudio = new Audio('https://usa9.fastcast4u.com/proxy/jamz?mp=/1');
  streamAudio.loop = true;
  const musicAudio = new Audio(
    chrome.runtime.getURL('rainy-lofi-city-lofi-music-332746.mp3'),
  );
  musicAudio.loop = false;

  const playMusic = () => {
    musicAudio.currentTime = 0;
    musicAudio.play().catch(() => undefined);
  };

  const resetTimer = () => {
    if (timerId !== null) {
      clearTimeout(timerId);
    }
    timerId = window.setTimeout(() => {
      playMusic();
      timerId = null;
    }, 2000);
  };

  const checkSubmitButton = () => {
    const btn = document.querySelector<HTMLButtonElement>(
      'button#composer-submit-button',
    );
    if (btn && btn.getAttribute('data-testid') === 'stop-button') {
      if (streamAudio.paused) {
        // play may reject if user hasn't interacted with the page
        streamAudio.play().catch(() => undefined);
      }
    } else if (!streamAudio.paused) {
      streamAudio.pause();
      streamAudio.currentTime = 0;
    }
  };

  const observeSubmitButton = () => {
    const target = document.body || document.documentElement;
    if (!target) return;
    const observer = new MutationObserver(() => checkSubmitButton());
    observer.observe(target, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-testid'],
    });
    checkSubmitButton();
  };

  const observe = () => {
    const target = document.body || document.documentElement;
    if (!target) return;
    const observer = new MutationObserver(() => resetTimer());
    observer.observe(target, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    resetTimer();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      observe();
      observeSubmitButton();
    });
  } else {
    observe();
    observeSubmitButton();
  }
}
