/**
 * ResizeObserver throws error to browser's console. That upsets testcafe that
 * fails the running test. According to this conversation, ResizeObserver error
 * can be safely ignored:
 * https://github.com/DevExpress/testcafe/issues/4857#issuecomment-598775956
 */
const jsErrorHandler = (): void => {
  window.addEventListener('error', (e) => {
    if (
      e.message ===
        'ResizeObserver loop completed with undelivered notifications.' ||
      e.message === 'ResizeObserver loop limit exceeded'
    ) {
      e.stopImmediatePropagation();
    }
  });
};

export default { content: `(${jsErrorHandler.toString()})()` };
