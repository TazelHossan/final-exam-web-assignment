$(document).ready(function ($) {
  const application = {
    Application: "WisrIdentity"
  };
  const title = $("h1").text().toLowerCase();
  const pageName = title.charAt(0) + title.slice(1);
  window.amplitude
    .getInstance()
    .logEvent(`Viewed ${pageName} page`, application);

  $("form").on("submit", function() {
    window.amplitude
      .getInstance()
      .logEvent(`Submitted ${title} form`, application);
  });
});
