const vscode = require('vscode')

const opMap = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '*': (a, b) => a * b,
  '/': (a, b) => a / b,
}

async function generateSequence() {
  if (!vscode.window.activeTextEditor) {
    vscode.window.showInformationMessage('No active text editor')
    return
  }

  const input = vscode.window.showInputBox({
    value:       '0',
    placeHolder: '0 + 1',
    prompt:      '<start> <operation?> <step?>'
  })

  const userInputOptions = await input
  if (!userInputOptions) {
    vscode.window.showInformationMessage('No input provided')
    return
  }

  const options = userInputOptions.split(' ').filter(token => !!token)

  let nextInSequence = options[0] ? parseInt(options[0]) : 0
  let op = opMap['+']
  let step = 1

  if (options.length > 1) {
    if (Object.hasOwn(opMap, options[1])) {
      op = opMap[options[1]]
    } else {
      // If the second token is not an operation (+, -, /, *), then assume
      // the user skipped that, and it is the step value instead.
      step = parseInt(options[1])
    }
  }

  if (options.length > 2) {
    step = parseInt(options[2])
  }

  vscode.window.activeTextEditor.edit((editBuilder) => {
    // Order selection by line number, so that sequences always start from the top of the file
    // and continue down the file.
    const orderedSelections = [...vscode.window.activeTextEditor.selections].sort((a, b) => {
      return a.anchor.line - b.anchor.line
    })

    for (const selection of orderedSelections) {
      editBuilder.replace(selection, nextInSequence.toString())
      nextInSequence = op(nextInSequence, step)
    }
  })
}

function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand('generate-sequence.generate', generateSequence)
  )
}

function deactivate() {
  // nop
}

module.exports = {
	activate,
	deactivate
}
