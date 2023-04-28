# Cursor Commands

This extension adds some additional cursor commands to VSCode:

- `cursor-commands.moveCursorToViewportCenter`: Move cursor to the center of editor viewport, preserving the folded regions state. Useful if you have scrolled the cursor out of the current view and you want to position the cursor to the current view without using the mouse
- `cursor-commands.scrollCenterToCursor`: Scroll to the center at the current cursor position

You can register keyboard shortcuts for these commands in your `keybindings.json` file.

```js
[
  { "key": "cmd+k cmd+u", "command": "cursor-commands.moveCursorToViewportCenter", "when": "editorTextFocus" },
  { "key": "ctrl+u", "command": "cursor-commands.scrollCenterToCursor", "when": "editorTextFocus" },
]
```
