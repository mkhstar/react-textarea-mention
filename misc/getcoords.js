const GetCoords = textArea => {
  let replica = document.createElement("div");
  const copyStyle = getComputedStyle(textArea);
  for (const prop of copyStyle) {
    replica.style[prop] = copyStyle[prop];
  }
  replica.style.height = "auto";
  replica.style.width = "auto";
  let span = document.createElement("span");
  replica.appendChild(span);
  let content = textArea.value.substr(0, textArea.selectionStart);
  let contentLines = content.split(/[\n\r]/g);
  let currentline = content.substr(0, content.selectionStart).split(/[\n\r]/g)
    .length;
  let replicaContent = "";
  contentLines.map((l, i) => {
    if (i === currentline - 1 && i < contentLines.length) {
      replicaContent += contentLines[i];
      return;
    }
    replicaContent += "\n";
  });
  span.innerHTML = replicaContent.replace(/\n$/, "\n");
  document.body.appendChild(replica);
  const { offsetWidth: spanWidth, offsetHeight: spanHeight } = span;
  document.body.removeChild(replica);
  return {
    x: spanWidth + textArea.offsetLeft,
    y: spanHeight + textArea.offsetTop
  };
};

export default GetCoords;
