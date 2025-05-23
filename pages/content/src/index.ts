import { sampleFunction } from '@src/sampleFunction';

console.log('content script loaded');

// Shows how to call a function defined in another module
sampleFunction();

if (location.hostname === 'chatgpt.com') {
  let timerId: number | null = null;
  const musicAudio = new Audio(chrome.runtime.getURL('content/notification.mp3'));
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
    }, 1000);
  };

  const checkSubmitButton = () => {
    const btn = document.querySelector<HTMLButtonElement>('button#composer-submit-button');
    if (btn && btn.getAttribute('data-testid') === 'stop-button') {
      playMusic();
    } else {
      musicAudio.pause();
      musicAudio.currentTime = 0;
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
