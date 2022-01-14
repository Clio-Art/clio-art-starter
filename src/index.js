function postArt(canvas) {
  canvas.toBlob(
    function (blob) {
      const message = new File([blob], "art.png", { type: "image/png" });
      const isIframe = !!window.parent;
      if (isIframe) {
        window.parent.postMessage(message, "*");
      }
    },
    "image/png",
    1
  );
}

function setup() {
  // draw code goes here

  // should be in the end of the function
  postArt(get().canvas);
}
