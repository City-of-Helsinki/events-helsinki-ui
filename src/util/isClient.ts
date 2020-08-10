/**
 * Check is the instance that is rendering component client (not SSR)
 */
export default typeof window !== 'undefined';
