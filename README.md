# language-eno

This package adds support for the [eno notation language](https://eno-lang.org), featuring thoroughly crafted custom syntax highlighting behaviour, as well as practical features to aid with authoring different languages when they are embedded inside eno documents.

## Embedded language support

If you are using an embedded language inside your eno documents, you can provide its language scope name(s) in language-eno's plugin settings to get syntax highlighting for your embedded language within blocks in eno documents.

Also there's a setting to disable Atom's default behaviour of trailing whitespace removal for eno documents, which is usually not wanted when markup languages like markdown are used.
