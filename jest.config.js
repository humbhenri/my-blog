// Source - https://stackoverflow.com/a/75811956
// Posted by Ogada Stanley Chinedu
// Retrieved 2026-09-13, License - CC BY-SA 4.0

module.exports = {
  "roots": [
    "<rootDir>"
  ],
  "testMatch": [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
}
