const btn = document.querySelector ('.selectionBtn');
const colorGrid = document.querySelector ('.color__grid');
const colorValue = document.querySelector ('.color__value');
const copyEl = document.querySelector ('.copyMsg');

btn.addEventListener ('click', async () => {
  // console.log("clicked")
  let [tab] = await chrome.tabs.query ({active: true, currentWindow: true});

  //   console.log (tab);

  chrome.scripting.executeScript (
    {
      target: {tabId: tab.id},
      function: pickColor,
    },
    async injectionResult => {
      const [data] = injectionResult;
      if (data.result) {
        const color = data.result.sRGBHex;
        colorGrid.style.backgroundColor = color;
        colorValue.innerHTML = color;
        try {
          await navigator.clipboard.writeText (color);
        } catch (err) {
          console.log (err);
        }
        copyEl.innerHTML = `Color Code is Copied to Clipboard`;
      }
    }
  );
});

async function pickColor () {
  //   console.log ('script working');

  try {
    const eyeDropper = new EyeDropper ();
    return await eyeDropper.open ();
  } catch (err) {
    console.error (err);
  }
}
