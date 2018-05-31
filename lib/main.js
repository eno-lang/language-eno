const fs = require('fs');
const path = require('path');
const remote = require('remote');

const embeddedScopesDescription = `
If you are using embedded languages inside your eno documents, you can provide a
comma separated list of language scopes here (for instance \`source.gfm,
text.md\` for markdown) to get syntax highlighting for these languages inside
blocks in eno documents. Be careful though - with some languages content inside
blocks that does not conform to their syntax can break syntax highlighting for
the whole document.
`.trim();

const whitespaceProtectionDescription = `
By default, one of Atom's core packages removes all trailing whitespace when a
file is saved. If you are embedding markdown or another language where trailing
whitespace bears significance inside your eno documents, you probably don't want
that. **Enable this setting to turn off trailing whitespace removal for eno documents.**
`.trim();

module.exports = {
  config: {
    embeddedLanguageScopes: {
      default: '',
      description: embeddedScopesDescription,
      title: 'Embedded language scopes',
      type: 'string'
    },
    protectTrailingWhitespace: {
      default: false,
      description: whitespaceProtectionDescription,
      title: 'Protect trailing whitespace',
      type: 'boolean'
    }
  },
  activate() {
    this.initializeEmbeddedScopes();
    this.initializeWhitespaceProtection();
  },
  deactivate() {
    this.removeEmbeddedScopes();
  },
  initializeEmbeddedScopes() {
    const embeddedScopes = atom.config.get('language-eno.embeddedLanguageScopes');

    this.updateEmbeddedScopes(embeddedScopes);

    atom.config.onDidChange('language-eno.embeddedLanguageScopes', ({ newValue }) => {
      this.updateEmbeddedScopes(newValue);
    });
  },
  initializeWhitespaceProtection() {
    const protectTrailingWhitespace = atom.config.get('language-eno.protectTrailingWhitespace');

    if(protectTrailingWhitespace) {
      atom.config.set('whitespace.removeTrailingWhitespace', false, { scopeSelector: '.text.eno' });
    }

    atom.config.onDidChange('language-eno.protectTrailingWhitespace', ({ newValue }) => {
      if(newValue === true) {
        atom.config.set('whitespace.removeTrailingWhitespace', false, { scopeSelector: '.text.eno' });
      } else {
        atom.config.unset('whitespace.removeTrailingWhitespace', { scopeSelector: '.text.eno' });
      }
    });
  },
  removeEmbeddedScopes() {
    atom.grammars.removeGrammarForScopeName('text.eno.embedded');
  },
  updateEmbeddedScopes(scopes) {
    this.removeEmbeddedScopes();

    if(scopes.trim().length > 0) {
      const includes = scopes.split(',').map(scope => ({ include: scope.trim() }));

      const grammar = {
        name: 'eno embedded',
        patterns: includes,
        scopeName: 'text.eno.embedded'
      };

      const grammarPath = path.join(remote.app.getPath('temp'), 'eno-embedded.json')
      fs.writeFileSync(grammarPath, JSON.stringify(grammar));

      atom.grammars.loadGrammar(grammarPath, err => { if(err) throw err; });
    }
  }
};
