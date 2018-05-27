const path = require('path');

const protectTrailingWhitespaceDescription = `
By default, one of Atom's core packages removes all trailing whitespace when a
file is saved. If you are embedding markdown or another language where trailing
whitespace bears significance inside your eno documents, you probably don't want
that. **Enable this setting to turn off trailing whitespace removal for eno documents.**
`.trim();

module.exports = {
  config: {
    protectTrailingWhitespace: {
      default: false,
      description: protectTrailingWhitespaceDescription,
      title: 'Protect trailing whitespace',
      type: 'boolean'
    }
  },
  activate() {
    const protectTrailingWhitespace = atom.config.get('language-eno.protectTrailingWhitespace');

    if(protectTrailingWhitespace) {
      atom.config.set('whitespace.removeTrailingWhitespace', false, { scopeSelector: '.text.eno' });
    }

    atom.config.observe('language-eno.protectTrailingWhitespace', protect => {
      if(protect) {
        atom.config.set('whitespace.removeTrailingWhitespace', false, { scopeSelector: '.text.eno' });
      } else {
        atom.config.unset('whitespace.removeTrailingWhitespace', { scopeSelector: '.text.eno' });
      }
    });
  }
};
