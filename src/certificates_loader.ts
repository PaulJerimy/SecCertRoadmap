import certificates from "../data/certificates.json" with { type: "json" };
import { skillLevelName as getSkillLevelName } from "./helpers.js";
import { Category, Certificate } from "./types";

const load = (): Certificate[] => {
  return certificates.map((cert) => {
    return {
      ...cert,
      skillLevelName: getSkillLevelName(cert.skillLevel),
      mainCategory: (cert.subCategory || cert.mainCategory) as Category,
      adjacentCategory: cert.adjacentCategory.map((cat: string) => cat as Category),
      parentCategory: cert.subCategory ? cert.mainCategory as Category : undefined
    };
  });
};

export default load;