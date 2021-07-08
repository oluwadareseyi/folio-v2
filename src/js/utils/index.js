export const copyText = (e) => {
  const text = e.target.innerText;
  const textArea = document.createElement("textarea");
  textArea.width = "1px";
  textArea.height = "1px";
  textArea.background = "transparents";
  textArea.value = text;
  document.body.append(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
};
