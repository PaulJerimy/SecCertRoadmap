import { categoryDisplayNames } from "../constants.js";
import { Category, Certificate } from "../types";
import { showToast } from "./render_toast.js";

export const clearList = () => {
  document.getElementById("certificates-list")!.innerHTML = "";
};

export const renderCategoryCerticatesList = (certificates: Certificate[], orderedCategories: Category[]): void => {
  const listDiv = document.getElementById("certificates-list")!;
  listDiv.innerHTML = "";

  orderedCategories.forEach((category) => {
    const certs = certificates.filter((cert) => cert.mainCategory === category);

    const categoryContainer = document.createElement("div");
    categoryContainer.className = `category-container`;

    if (categoryDisplayNames[category]) {
      const titleContainer = document.createElement("div");
      const categoryTitle = document.createElement("h2");

      categoryTitle.innerHTML = categoryDisplayNames[category];

      titleContainer.appendChild(categoryTitle);
      categoryContainer.appendChild(titleContainer);
    }

    const certsContainer = document.createElement("div");
    certsContainer.className = "certs-list-container";

    certs.forEach((certificate) => {
      const certificateElement = document.createElement("div");
      certificateElement.className = "list-cert";

      const certificateTitle = document.createElement("h3");
      certificateTitle.innerHTML = certificate.content;

      const certificateDescription = document.createElement("p");
      certificateDescription.innerHTML = certificate.tooltiptext;

      const controlsContainer = document.createElement("div");
      controlsContainer.className = "controls-container";

      const detailsButton = document.createElement("button");
      detailsButton.innerHTML = "Details";
      detailsButton.className = "details-button";
      detailsButton.onclick = () => showToast(certificate.content, certificate.tooltiptext, certificate.href);

      certificateElement.appendChild(certificateTitle);
      certificateElement.appendChild(certificateDescription);

      controlsContainer.appendChild(detailsButton);
      certificateElement.appendChild(controlsContainer);

      certsContainer.appendChild(certificateElement);
    });

    categoryContainer.appendChild(certsContainer);
    listDiv.appendChild(categoryContainer);
  });
};
