$(document).ready(() => {
  // Find all <a> tags in the document and look for external
  var links = document.getElementsByTagName('a');

  // Get the current domain
  var currentDomain = window.location.hostname;

  // Loop through each link
  for (var i = 0; i < links.length; i++) {
    var link = links[i];

    // Get the link's domain
    var linkDomain = link.hostname;

    // Check if the link is an external link
    if (linkDomain !== currentDomain) {
      // Set the target attribute to "_blank"
      link.setAttribute('target', '_blank');
    }
  }
});
