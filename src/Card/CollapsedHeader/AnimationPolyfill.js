import deprecationLog from '../../utils/deprecationLog';

deprecationLog(`Using "Card/CollapsedHeader/AnimationPolyfill.js" is deprecated. Please use the newer polyfills in "testkit/polyfills"`);

export default function animationPolyfills(window, global) {
  let lastTime = 0;
  const vendors = ['ms', 'moz', 'webkit', 'o'];

  for (let x = 0; x < vendors.length && !global.requestAnimationFrame; ++x) {
    global.requestAnimationFrame = global[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame =
      window[vendors[x] + 'CancelAnimationFrame'] ||
      window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!global.requestAnimationFrame) {
    global.requestAnimationFrame = function (callback) {
      const currTime = new Date().getTime();
      const timeToCall = Math.max(0, 16 - (currTime - lastTime));
      const id = window.setTimeout(() => {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
  }
}
