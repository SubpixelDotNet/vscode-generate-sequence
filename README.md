# Generate Sequence

(Forked from https://github.com/NeptuneDesign/vs-sequential-number)

Generate numbers sequentially at each cursor position.  Also supports using different operations (+, -, *, and /), and an optional step value.

Differences from vs-sequential-number:

1. Works from top to bottom of the file, ignores which order your cursors were placed (may not be ideal for some folks)
2. Base-zero by default

## Usage

Load the Command Palette (Cmd+Shift+P) and look for `Generate Sequence`

## Syntax Rules

```
<start> <operation?> <step?>
```

| Option                   | Default | Definition                                                                           |
| :------------------------| :------ | :----------------------------------------------------------------------------------- |
| **start**                | `0`     | The first number in the sequence                                                     |
| **operation** (optional) | `+`     | An operation to apply for each iteration (+, -, *, or /)                             |
| **step** (optional)      | `1`     | A number to add, subtract, multiply, or divide with the previously generated number  |