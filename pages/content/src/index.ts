console.log('content script loaded');

if (location.hostname === 'chatgpt.com') {
  const musicAudio = new Audio(chrome.runtime.getURL('content/notification.mp3'));
  musicAudio.loop = false;

  let notify = false;
  let prevExists = false;

  const playMusic = () => {
    musicAudio.currentTime = 0;
    musicAudio.play().catch(() => undefined);
  };

  const checkButton = () => {
    const btn = document.querySelector<HTMLButtonElement>('button#composer-submit-button');
    const exists = btn !== null;

    if (exists && !prevExists) {
      if (btn!.getAttribute('data-testid') === 'stop-button') {
        notify = true;
      }
    } else if (!exists && prevExists) {
      if (notify) {
        playMusic();
      }
      notify = false;
    }

    prevExists = exists;
  };

  const observe = () => {
    const target = document.body || document.documentElement;
    if (!target) return;
    const observer = new MutationObserver(() => checkButton());
    observer.observe(target, { childList: true, subtree: true });
    checkButton();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observe);
  } else {
    observe();
  }
}
