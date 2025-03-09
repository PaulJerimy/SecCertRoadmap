import load from "./certificates_loader.js";
import { listOrderedCategories, skillLevelDisplayNames } from "./constants.js";
import { updateCertificatesOnControlChange } from "./controls.js";
import { createCategoriesGrid } from "./create_categories_grid.js";
import createCertificatesGrid from "./create_certificate_grid.js";
import { countColumns } from "./helpers.js";
import { renderControlCheckbox, renderRadioControl } from "./renderers/render_controls.js";
import { renderCategoriesGrid, renderCertificates } from "./renderers/render_grid.js";
import { renderCategoryCerticatesList } from "./renderers/render_list.js";

const main = (): void => {
  const certificates = load();
  const categoriesGrid = createCategoriesGrid(certificates);
  const numberOfColumns = countColumns(categoriesGrid);
  const certificateGrid = createCertificatesGrid(certificates, categoriesGrid, numberOfColumns);

  Object.entries(categoriesGrid).forEach(([name, cat]) => {
    const group = cat.isSubCategory ? "sub-category-controls" : "category-controls";
    renderControlCheckbox(group, name, cat.displayName, "category-checkbox", !cat.hidden, !cat.renderControl);
  });

  ["beginner", "intermediate", "expert"].forEach((skillLevel) => {
    renderControlCheckbox(
      "skill-level-controls",
      skillLevel,
      skillLevelDisplayNames[skillLevel],
      "skill-level-checkbox",
      true,
      false
    );
  });

  renderRadioControl();

  if (window.innerWidth > 950) {
    renderCategoriesGrid(categoriesGrid, ["beginner", "intermediate", "expert"]);
    renderCertificates(certificateGrid, numberOfColumns);
    (document.querySelector('input[name="display"][value="grid"]') as HTMLInputElement).checked = true;
  } else {
    renderCategoryCerticatesList(certificates, listOrderedCategories);
    (document.querySelector('input[name="display"][value="list"]') as HTMLInputElement).checked = true;
  }

  document
    .getElementById("controls")!
    .addEventListener("input", (_e) => updateCertificatesOnControlChange(certificates));
};

main();
