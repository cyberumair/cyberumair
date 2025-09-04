(() => {
  const lines = [
    "[ OK ] Loading Portfolio...",
    "[ OK ] Cyber Projects Initialized",
    "[ !! ]  Tools Not Yet Deployed",
    "[ >> ]  Track updates at github.com/cyberumair"
  ];
  
  const outputRoot = document.getElementById("output");
  const lineEls = Array.from(outputRoot.querySelectorAll(".line .text"));
  const typing_cursor = document.getElementById("typing_cursor");
  
  const CHAR_MS = 40;
  const LINE_PAUSE = 500;
  const START_DELAY = 100;
  const FINAL_PAUSE = 400;
  const EXTRA_DELAY_FIRST = 1500;
  
  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
  
  function colorize(text) {
    if (text.startsWith("[ OK ]"))
      return `<span class="ok">[ OK ]</span>${text.slice(6)}`;
    if (text.startsWith("[ !! ]"))
      return `<span class="warn">[ !! ]</span>${text.slice(7)}`;
    if (text.startsWith("[ >> ]")) {
      const content = text.slice(7);
      const linked = content.replace(
        /(github\.com\/[^\s]+)/,
        `<a class="gh-link" href="https://$1" target="_blank">$1</a>`
      );
      return `<span class="info">[ >> ]</span>${linked}`;
    }
    return text;
  }
  
  async function typeAll() {
    await sleep(START_DELAY);
    for (let i = 0; i < lines.length; i++) {
      const rawLine = lines[i];
      const prettyLine = colorize(rawLine);
      
      // prepare with colorized skeleton first
      lineEls[i].innerHTML = prettyLine;
      const finalHTML = lineEls[i].innerHTML;
      lineEls[i].textContent = ""; // clear to type manually
      
      let typed = "";
      for (let c = 0; c < rawLine.length; c++) {
        typed += rawLine[c];
        lineEls[i].textContent = typed;
        lineEls[i].appendChild(typing_cursor);
        await sleep(CHAR_MS);
      }
      
      // restore decorated version after typing
      lineEls[i].innerHTML = finalHTML;
      lineEls[i].appendChild(typing_cursor);
      
      if (i === 0) await sleep(EXTRA_DELAY_FIRST);
      await sleep(LINE_PAUSE);
    }
    await sleep(FINAL_PAUSE);
    // cursor keeps blinking
  }
  
  typeAll();
  
  // reduced motion fallback
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    lines.forEach((line, idx) => {
      lineEls[idx].innerHTML = colorize(line);
    });
    lineEls[lines.length - 1].appendChild(typing_cursor);
  }
})();