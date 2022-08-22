const fabric = require('@umijs/fabric');

module.exports = {
  extends: 'stylelint-config-standard',
  ...fabric.stylelint,
};
