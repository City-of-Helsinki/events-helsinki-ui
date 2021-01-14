/**
 * See more info: https://github.com/DevExpress/testcafe/issues/4857#issuecomment-598775956
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
