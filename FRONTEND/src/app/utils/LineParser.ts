export function ToSingleLine(text: string) {
  const lines = text.trim().split('\n');
  const formattedCode = lines.join("\\n").replace(/\t/g, "\\t");
  console.log(formattedCode);
}
