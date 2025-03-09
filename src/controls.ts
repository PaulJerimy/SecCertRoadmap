import { subCategories, subCategoryParentCategory, mainCategories, listOrderedCategories } from "./constants.js";
import { createCategoriesGrid, updateCategoriesGrid } from "./create_categories_grid.js";
import createCertificatesGrid from "./create_certificate_grid.js";
import { countColumns, skillLevelName } from "./helpers.js";
import { clearGrid, renderCategoriesGrid, renderCertificates } from "./renderers/render_grid.js";
import { clearList, renderCategoryCerticatesList } from "./renderers/render_list.js";
import { Category, Certificate, SkillLevelName, SubCategoryKey } from "./types";

export const updateCertificatesOnControlChange = (certificates: Certificate[]) => {
  let categoriesGrid = createCategoriesGrid(certificates);

  const controlsForm = document.getElementById("controls")!;
  const checkboxValues: { [key: string]: boolean } = {};

  const skillCheckboxes = controlsForm.querySelectorAll(".skill-level-checkbox");
  const skillLevelCheckbox: { [key: string]: boolean } = {};

  [...mainCategories, ...subCategories].forEach((inputName: Category) => {
    const inputElement = document.getElementById(inputName) as HTMLInputElement;

    if (subCategories.includes(inputName)) {
      inputName = inputName as SubCategoryKey;
      const mainCategory = subCategoryParentCategory[inputName];
      const mainCategoryHidden = categoriesGrid[mainCategory]?.hidden;

      if (mainCategoryHidden) {
        checkboxValues[inputName] = false;
        categoriesGrid[inputName].hidden = true;
        inputElement.checked = true;
      } else {
        checkboxValues[inputName] = inputElement.checked;
        categoriesGrid[inputName].hidden = !inputElement.checked;
      }
    } else {
      checkboxValues[inputName] = inputElement.checked;
      categoriesGrid[inputName].hidden = !inputElement.checked;
    }
  });

  skillCheckboxes.forEach((checkbox) => {
    const inputElement = checkbox as HTMLInputElement;
    skillLevelCheckbox[inputElement.name] = inputElement.checked;
  });

  const filteredCerts = certificates
    .filter((cert) => checkboxValues[cert.mainCategory])
    .map((cert) => {
      const adjacentCats = cert.adjacentCategory.filter((cat) => checkboxValues[cat]);

      return {
        ...cert,
        adjacent_category: adjacentCats,
      };
    })
    .filter((cert) => skillLevelCheckbox[skillLevelName(cert.skillLevel)]);

  categoriesGrid = updateCategoriesGrid(categoriesGrid, filteredCerts);
  const numberOfColumns = countColumns(categoriesGrid);
  const updatedGrid = createCertificatesGrid(filteredCerts, categoriesGrid, numberOfColumns);
  const enabledSkillLevels = Object.keys(skillLevelCheckbox)
    .filter((level) => skillLevelCheckbox[level])
    .map((level) => level as SkillLevelName);

  const filteredCategories = listOrderedCategories.filter((cat) => !categoriesGrid[cat].hidden);

  const display = document.querySelector("input[name=display]:checked")!.value;

  if (display === "grid") {
    clearList();
    renderCategoriesGrid(categoriesGrid, enabledSkillLevels);
    renderCertificates(updatedGrid, numberOfColumns);
  } else {
    clearGrid();
    renderCategoryCerticatesList(filteredCerts, filteredCategories as Category[]);
  }
};
