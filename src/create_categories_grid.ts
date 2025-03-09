import { categoryDisplayNames, noControlCategories, orderedCategories, subCategories } from "./constants.js";
import { range } from "./helpers.js";
import { CategoriesGrid, Certificate } from "./types";

export const createCategoriesGrid = (certificates: Certificate[]): CategoriesGrid => {
  let categoriesGrid: CategoriesGrid = {
    skilllevel: { start: 1, span: 1, hidden: false, displayName: "", renderControl: false, isSubCategory: false },
  };

  const maxSkillLevel = Math.max(...certificates.map((cert) => cert.skillLevel));

  return orderedCategories.reduce((acc, category) => {
    const [start, span] = calculateStartAndSpan(category, certificates, acc, maxSkillLevel);

    categoriesGrid[category] = {
      start: start,
      span: span,
      hidden: false,
      renderControl: !noControlCategories.includes(category),
      displayName: categoryDisplayNames[category] || "",
      isSubCategory: subCategories.includes(category),
    };

    return categoriesGrid;
  }, categoriesGrid);
};

export const updateCategoriesGrid = (categoriesGrid: CategoriesGrid, certificates: Certificate[]): CategoriesGrid => {
  const maxSkillLevel = Math.max(...certificates.map((cert) => cert.skillLevel));

  orderedCategories.forEach((category) => {
    categoriesGrid[category].start = 0;
    categoriesGrid[category].span = 0;
  });

  return orderedCategories.reduce((acc, category) => {
    if (acc[category].hidden) return acc;

    const [start, span] = calculateStartAndSpan(category, certificates, acc, maxSkillLevel);

    categoriesGrid[category].start = start;
    categoriesGrid[category].span = span;

    return categoriesGrid;
  }, categoriesGrid);
};

const calculateStartAndSpan = (
  category: string,
  certificates: Certificate[],
  categoriesGrid: CategoriesGrid,
  maxSkillLevel: number
): [number, number] => {
  const nextColumn = Object.values(categoriesGrid).reduce((acc, cat) => cat.span + acc, 0);

  const categoryCerts = certificates.filter((cert) => cert.mainCategory === category);
  let maxCertificatesInRow = 0;

  range(maxSkillLevel, 1).forEach((level) => {
    const certsInLevel = categoryCerts.filter((cert) => cert.skillLevel === level);
    if (certsInLevel.length > maxCertificatesInRow) {
      maxCertificatesInRow = certsInLevel.length;
    }
  });

  return [nextColumn + 1, maxCertificatesInRow];
};
