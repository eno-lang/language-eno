const fs = require('fs');
const path = require('path');
const remote = require('remote');

const scopesDescription = `
A comma separated list of language scopes (for instance \`source.gfm, text.md\`
for markdown). Be advised though that some embedded language scopes can break
syntax highlighting for the whole document (through unterminated blocks,
strings, etc.).
`.trim();

const whitespaceProtectionDescription = `
By default, one of Atom's core packages removes all trailing whitespace when a
file is saved. If you are embedding markdown or another language where trailing
whitespace bears significance inside your eno documents, you might want to enable this.
`.trim();

module.exports = {
  config: {
    embeddedLanguages: {
      properties: {
        enabled: {
          default: false,
          order: 1,
          title: 'Enable syntax highlighting for embedded languages inside blocks',
          type: 'boolean'
        },
        scopes: {
          default: 'source.gfm, text.md',
          description: scopesDescription,
          order: 2,
          title: 'Language scopes',
          type: 'string'
        }
      },
      order: 1,
      title: 'Embedded Languages',
      type: 'object'
    },
    whitespaceProtection: {
      properties: {
        enabled: {
          default: false,
          description: whitespaceProtectionDescription,
          title: 'Protect trailing whitespace inside eno documents',
          type: 'boolean'
        }
      },
      order: 2,
      title: 'Whitespace Protection',
      type: 'object'
    }
  },
  activate() {
    this.initializeEmbeddedLanguages();
    this.initializeWhitespaceProtection();
  },
  deactivate() {
    this.removeEmbeddedGrammar();
  },
  initializeEmbeddedLanguages() {
    this.updateEmbeddedGrammar();

    atom.config.onDidChange('language-eno.embeddedLanguages.enabled', () => this.updateEmbeddedGrammar());
    atom.config.onDidChange('language-eno.embeddedLanguages.scopes', () => this.updateEmbeddedGrammar());
  },
  initializeWhitespaceProtection() {
    const protectWhitespace = atom.config.get('language-eno.whitespaceProtection.enabled');

    if(protectWhitespace) {
      atom.config.set('whitespace.removeTrailingWhitespace', false, { scopeSelector: '.text.eno' });
    }

    atom.config.onDidChange('language-eno.whitespaceProtection.enabled', ({ newValue }) => {
      if(newValue === true) {
        atom.config.set('whitespace.removeTrailingWhitespace', false, { scopeSelector: '.text.eno' });
      } else {
        atom.config.unset('whitespace.removeTrailingWhitespace', { scopeSelector: '.text.eno' });
      }
    });
  },
  removeEmbeddedGrammar() {
    atom.grammars.removeGrammarForScopeName('text.eno.embedded');
  },
  updateEmbeddedGrammar() {
    this.removeEmbeddedGrammar();

    const enabled = atom.config.get('language-eno.embeddedLanguages.enabled');

    if(enabled) {
      const scopes = atom.config.get('language-eno.embeddedLanguages.scopes');

      if(scopes.trim().length === 0)
        return;

      const includes = scopes.split(',').map(scope => ({ include: scope.trim() }));

      const grammar = {
        name: 'Embedded Languages (eno)',
        patterns: includes,
        scopeName: 'text.eno.embedded'
      };

      const grammarPath = path.join(remote.app.getPath('temp'), 'eno-embedded.json')
      fs.writeFileSync(grammarPath, JSON.stringify(grammar));

      atom.grammars.loadGrammar(grammarPath, err => { if(err) throw err; });
    }
  }
};
