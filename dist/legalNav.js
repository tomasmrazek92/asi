"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/legalNav.js
  var anchorsContainer = document.querySelector(".legal_sidebar-links");
  var anchorLinks = Array.from(anchorsContainer.querySelectorAll("a"));
})();
//# sourceMappingURL=legalNav.js.map
