(function setUpPrintButton() {
  "use strict";

  const headerRoot = document.getElementById("resume-header");
  const contentRoot = document.getElementById("resume-content");
  const printButton = document.getElementById("print-resume");
  const printError = document.getElementById("print-error");

  if (!headerRoot || !contentRoot || !printButton) {
    return;
  }

  function cssInchesToPixels(propertyName) {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(propertyName)
      .trim();

    return Number.parseFloat(value) * 96;
  }

  function resumeFitsOnOnePage() {
    const pageHeight = cssInchesToPixels("--page-height");
    const pageMargin = cssInchesToPixels("--page-margin-block");
    const printableHeight = pageHeight - pageMargin * 2;
    const finalSection = contentRoot.lastElementChild;

    if (!finalSection) {
      return true;
    }

    const contentHeight =
      finalSection.getBoundingClientRect().bottom -
      headerRoot.getBoundingClientRect().top;

    return contentHeight <= printableHeight + 1;
  }

  printButton.addEventListener("click", function printResume() {
    if (!resumeFitsOnOnePage()) {
      if (printError) {
        printError.textContent =
          "This resume exceeds one printed page. Trim the content before saving it as a PDF.";
        printError.hidden = false;
      }
      return;
    }

    if (printError) {
      printError.hidden = true;
    }

    window.print();
  });
})();
