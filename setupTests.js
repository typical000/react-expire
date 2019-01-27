const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');

/**
 * Setup enzyme's react adapter
 */
Enzyme.configure({
  adapter: new EnzymeAdapter(),
});

/**
 * Simplify mocks clear after each test suite
 */
afterEach(() => {
  jest.clearAllMocks().restoreAllMocks();
});
