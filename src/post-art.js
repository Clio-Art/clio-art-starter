// do not edit this function
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
