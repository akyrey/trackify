import { ngMocks } from 'ng-mocks';

// auto spy for ngMocks
ngMocks.autoSpy('jest');

Object.defineProperty(window, 'CSS', { value: null });
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    display: 'none',
    appearance: ['-webkit-appearance'],
  }),
});

Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>',
});
Object.defineProperty(document.body.style, 'transform', {
  value: () => ({
    enumerable: true,
    configurable: true,
  }),
});
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    getPropertyValue: (prop: any) => {
      return '';
    },
  }),
});
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
Object.defineProperty(navigator, 'mediaDevices', {
  value: () => ({
    enumerateDevices: jest.fn(),
  }),
});
Object.defineProperty(navigator, 'geolocation', {
  value: { watchPosition: jest.fn() },
});
Object.defineProperty(window, 'MediaDeviceInfo', {
  value: {},
});
