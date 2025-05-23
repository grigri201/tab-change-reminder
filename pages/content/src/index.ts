if (location.hostname === 'chatgpt.com') {
  const musicAudio = new Audio(chrome.runtime.getURL('content/notification.mp3'));
  musicAudio.loop = false;

  let notify = false;
  let prevExists = false;
  let checkTimeout: number | null = null;

  const playMusic = () => {
    musicAudio.currentTime = 0;
    musicAudio.play().catch(() => undefined);
  };

  const checkStopButton = () => {
    const btn = document.querySelector<HTMLButtonElement>('button#composer-submit-button');
    if (btn && btn.getAttribute('data-testid') === 'stop-button') {
      notify = true;
      // 停止检查，因为已经找到 stop-button
      if (checkTimeout) {
        clearInterval(checkTimeout);
        checkTimeout = null;
      }
    }
  };

  const checkButton = () => {
    const btn = document.querySelector<HTMLButtonElement>('button#composer-submit-button');

    if (btn && !prevExists) {
      // 按钮刚出现，启动定时检查
      checkTimeout = setInterval(checkStopButton, 1000);
    } else if (!btn && prevExists) {
      // 按钮消失了
      if (checkTimeout) {
        clearInterval(checkTimeout);
        checkTimeout = null;
      }
      if (notify) {
        playMusic();
      }
      notify = false;
    }

    prevExists = !!btn;
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
