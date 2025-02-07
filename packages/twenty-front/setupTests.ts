import { TextEncoder } from 'node:util';
import 'whatwg-fetch'; // This adds fetch to the global scope

// Add TextEncoder/TextDecoder to global scope
global.TextEncoder = TextEncoder


/**
 * The structuredClone global function is not available in jsdom, it needs to be mocked for now.
 *
 * The most naive way to mock structuredClone is to use JSON.stringify and JSON.parse. This works
 * for arguments with simple types like primitives, arrays and objects, but doesn't work with functions,
 * Map, Set, etc.
 */
global.structuredClone = (val) => {
  return JSON.parse(JSON.stringify(val));
};
