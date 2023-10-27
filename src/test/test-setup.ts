import jasmine from 'jasmine';

/**
 * Wrapper function to initialize a TestBed configuration with global before/after methods defined.
 * @param initTest The callback function to initialize the tests
 * @param cleanupStyles Option to cleanup global styles injected into dom
 */
export const setupTests = (initTest, cleanupStyles = true) => {
  beforeEach(() => {
    initTest();
  });

  // Cleanup styles injected by ng-select and other various style modifications after each TestBed suite is complete.
  if (cleanupStyles) {
    afterAll(() => {
      window.document.querySelectorAll('style').forEach((style: HTMLStyleElement) => style.remove());
    });
  }
};
