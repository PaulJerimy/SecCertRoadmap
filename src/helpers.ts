import { CategoriesGrid, CategoryColumn, SkillLevelName } from "./types";

export const countColumns = (categories: CategoriesGrid): number => {
  return Object.values(categories).reduce((acc: number, col: CategoryColumn) => (col.hidden ? acc : acc + col.span), 0);
};

export const skillLevelName = (skillLevel: number): SkillLevelName => {
  if (skillLevel < 10) {
    return "expert";
  } else if (skillLevel < 19) {
    return "intermediate";
  } else {
    return "beginner";
  }
};

export const range = (size: number, startAt = 0): number[] => [...Array(size).keys()].map((i) => i + startAt);
