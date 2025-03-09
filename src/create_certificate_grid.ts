import { range } from "./helpers.js";
import { CategoriesGrid, Certificate, CertificateGrid } from "./types";

interface Cursor {
  certificate: Certificate;
  currentRow: number;
  currentCol: number;
  validColStart: number;
  validColEnd: number;
  spansMultipleCategories: boolean;
  hasAdjacentColBefore: boolean;
  hasAdjacentColAfter: boolean;
}

const createCertificatesGrid = (
  certificates: Certificate[],
  categoriesGrid: CategoriesGrid,
  numberOfColumns: number
) => {
  certificates = sortBySkillLevelAndAdjacentCategory(certificates);

  const initialGrid: CertificateGrid = {
    rowValues: {
      1: {
        skillLevel: 1,
        columnsOccupied: Array(numberOfColumns + 1).fill(null),
      },
    },
    certificates: [],
    categoriesGrid: categoriesGrid,
    numberOfColumns: numberOfColumns,
  };

  return certificates.reduce(rowReduction, initialGrid);
};

const sortBySkillLevelAndAdjacentCategory = (certificates: Certificate[]): Certificate[] => {
  return [...certificates].sort((a, b) => {
    if (a.skillLevel === b.skillLevel) {
      const aSpan = a.adjacentCategory.length + 1;
      const bSpan = b.adjacentCategory.length + 1;
      return bSpan - aSpan;
    }

    return a.skillLevel - b.skillLevel;
  });
};

const rowReduction = (acc: CertificateGrid, cert: Certificate) => {
  const mainCol = acc.categoriesGrid[cert.mainCategory];

  const adjacentCols = cert.adjacentCategory.map((col) => acc.categoriesGrid[col]).filter((col) => !col.hidden);

  let colStart = mainCol.start;
  let colEnd = colStart + mainCol.span;

  let validColStart = colStart;
  let validColEnd = colEnd;

  const adjacentColBefore = adjacentCols.some((col) => col.start < mainCol.start);

  const adjacentColAfter = adjacentCols.some((col) => col.start > mainCol.start);

  const hiddenColsBefore = Object.values(acc.categoriesGrid)
    .filter((col) => col.start < mainCol.start && col.hidden)
    .reduce((acc, col) => acc + col.span, 0);

  adjacentCols.forEach((col) => {
    const adjStart = col.start;
    const adjEnd = col.start + col.span;
    if (adjStart < colStart) validColStart = adjEnd - 1;
    if (!adjacentColBefore) validColStart = mainCol.start + mainCol.span - 1;
    if (!adjacentColAfter) validColEnd = mainCol.start + 1;
    if (adjEnd > colEnd) validColEnd = adjStart + 1;
  });

  if (hiddenColsBefore > 0) {
    validColStart = validColStart - hiddenColsBefore;
    validColEnd = validColEnd - hiddenColsBefore;
  }

  let initialCursor: Cursor = {
    certificate: cert,
    currentRow: 1,
    currentCol: validColStart,
    validColStart,
    validColEnd,
    spansMultipleCategories: adjacentCols.length > 0,
    hasAdjacentColBefore: adjacentColBefore,
    hasAdjacentColAfter: adjacentColAfter,
  };

  return assignCoords(initialCursor, acc);
};

const assignCoords = (cursor: Cursor, grid: CertificateGrid): CertificateGrid => {
  const certSkill = cursor.certificate.skillLevel;
  const rowSkill = grid.rowValues[cursor.currentRow].skillLevel;

  if (certSkill > rowSkill) return appendRowForSkillLevel(cursor, grid);
  if (!cursor.spansMultipleCategories) return appendSingleCert(cursor, grid);
  if (cursor.spansMultipleCategories) return appendMutliCategoryCert(cursor, grid);

  return grid;
};

const appendRowForSkillLevel = (cursor: Cursor, grid: CertificateGrid): CertificateGrid => {
  cursor.currentRow++;

  if (!grid.rowValues[cursor.currentRow]) {
    grid.rowValues[cursor.currentRow] = {
      skillLevel: cursor.certificate.skillLevel,
      columnsOccupied: Array(grid.numberOfColumns + 1).fill(null),
    };
  }

  return assignCoords(cursor, grid);
};

const appendSingleCert = (cursor: Cursor, grid: CertificateGrid): CertificateGrid => {
  if (cursor.currentCol === cursor.validColEnd) {
    cursor.currentCol = cursor.validColStart;

    return appendRowForSkillLevel(cursor, grid);
  }

  if (grid.rowValues[cursor.currentRow].columnsOccupied[cursor.currentCol] === null) {
    grid.rowValues[cursor.currentRow].columnsOccupied[cursor.currentCol] = "o";

    const cert = {
      ...cursor.certificate,
      colStart: cursor.currentCol,
      colEnd: cursor.currentCol,
      row: cursor.currentRow,
    };

    grid.certificates.push(cert);

    return grid;
  }

  cursor.currentCol = cursor.currentCol + 1;
  return assignCoords(cursor, grid);
};

const appendMutliCategoryCert = (cursor: Cursor, grid: CertificateGrid): CertificateGrid => {
  const rangeFree = grid.rowValues[cursor.currentRow].columnsOccupied
    .slice(cursor.validColStart, cursor.validColEnd)
    .every((val) => val === null);

  if (rangeFree) {
    const span = cursor.validColEnd - cursor.validColStart;
    const requiredRange = range(span, cursor.validColStart);

    requiredRange.forEach((col) => {
      grid.rowValues[cursor.currentRow].columnsOccupied[col] = "o";
    });

    const cert = {
      ...cursor.certificate,
      colStart: cursor.currentCol,
      colEnd: cursor.validColEnd,
      row: cursor.currentRow,
    };

    grid.certificates.push(cert);

    return grid;
  }

  return appendRowForSkillLevel(cursor, grid);
};

export default createCertificatesGrid;
