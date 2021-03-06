module.exports = {
  root: true,
  extends: [`eslint:recommended`, `prettier`],
  parserOptions: {
    sourceType: `module`,
    ecmaVersion: 2020,
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  rules:{
    "quotes": [`error`,`backtick`],
    
  }
};
