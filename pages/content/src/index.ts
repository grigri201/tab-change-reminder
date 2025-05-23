import { sampleFunction } from '@src/sampleFunction';

console.log('content script loaded');

// Shows how to call a function defined in another module
sampleFunction();

if (location.hostname === 'chatgpt.com') {
  const audioCtx = new AudioContext();
  let timerId: number | null = null;

  const playBell = () => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 880;
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.3);
  };

  const resetTimer = () => {
    if (timerId !== null) {
      clearTimeout(timerId);
    }
    timerId = window.setTimeout(() => {
      playBell();
      timerId = null;
    }, 2000);
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
    document.addEventListener('DOMContentLoaded', observe);
  } else {
    observe();
  }
}
