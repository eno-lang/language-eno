# language-eno

This package adds support for the [eno notation language](https://eno-lang.org), featuring a custom color scheme (\*) specifically designed for eno's syntactical structure, as well as practical features to aid with authoring different languages when they are embedded inside eno documents.

## Custom color scheme (\*)

Contemporary texteditors like Atom include clever mechanisms to allow syntax color schemes to be applied across different languages without the designer having to know or account for all the languages her scheme will be used for. However, when languages deviate off the classical lexical layout that most popular programming languages share, the quality these generic mechanisms produce quickly deteriorates, and the pleasantness of having one's favorite color palette everywhere is traded for a significant loss of readability, which is, after all, the reason why we have syntax highlighting in the first place.

With this in mind, and a clear commitment to readability, *language-eno* follows the approach of providing a fully custom color scheme, however, respecting the not at all superficial desire for people to author text on either dark or bright backgrounds, which it was both specifically designed for. If you still have any issues with readability on a specific color scheme you are using, we can gladly look into improving compatibility even further or even into providing multiple color scheme options in the future.


## Embedded language support

If you are using an embedded language inside your eno documents, you can provide its language scope name(s) in language-eno's plugin settings, thereby enabling syntax highlighting for your embedded language within blocks in eno documents.

Also there's a setting to disable Atom's default behaviour of trailing whitespace removal for eno documents, which is usually not wanted when markup languages like markdown are embedded within fields and blocks.
