import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const disposables = [];

	disposables.push(vscode.commands.registerCommand('cursor-commands.moveCursorToViewportCenter', () => {
		if (!vscode.window.activeTextEditor) {
			return;
		}

		const activeEditor = vscode.window.activeTextEditor;

		const linesAvailable = [];

		for (const visibleRange of activeEditor.visibleRanges) {
			if (visibleRange.isEmpty) {
				continue;
			}

			if (visibleRange.isSingleLine) {
				linesAvailable.push({ line: visibleRange.start.line, type: 'start' });
			} else {
				linesAvailable.push({ line: visibleRange.start.line, type: 'start' });

				for (let i = visibleRange.start.line + 1; i < visibleRange.end.line; i++) {
					linesAvailable.push({ line: i, type: 'middle' });
				}

				linesAvailable.push({ line: visibleRange.end.line, type: 'end' });
			}
		}

		const middleLineNumber = linesAvailable[Math.round(linesAvailable.length / 2) - 1].line;
		const textLine = activeEditor.document.lineAt(middleLineNumber);

		const newCursorPosition = new vscode.Position(textLine.lineNumber, textLine.firstNonWhitespaceCharacterIndex);
		activeEditor.selection =  new vscode.Selection(newCursorPosition, newCursorPosition);
	}));

	disposables.push(vscode.commands.registerCommand('cursor-commands.scrollCenterToCursor', () => {
		if (!vscode.window.activeTextEditor) {
			return;
		}

		const activeEditor = vscode.window.activeTextEditor;

		activeEditor.revealRange(new vscode.Range(activeEditor.selection.start, activeEditor.selection.end), vscode.TextEditorRevealType.InCenter);
	}));

	context.subscriptions.push(...disposables);
}

export function deactivate() {}
