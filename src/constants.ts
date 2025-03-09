import { Category, SubCategoryMap, SubCategoryParentCategoryMap } from "./types";

export const SKILL_LEVEL = "skilllevel";
export const NETWORK = "network";
export const IAM = "iam";
export const CLOUD_SEC_OPS = "cloud_sec_ops";
export const NIX = "nix";
export const ICS_IOT = "ics_iot";
export const ENGINEER = "engineer";
export const ASSET = "asset";
export const MGMT = "mgmt";
export const MGMT_LEFT = "mgmt_left";
export const MGMT_RIGHT = "mgmt_right";
export const GRC = "grc";
export const TEST = "test";
export const SOFTWARE = "software";
export const BLUEOPS = "blueops";
export const FORENSICS = "forensics";
export const INCIDENT_HANDLING = "incident_handling";
export const REDOPS = "redops";
export const PEN_TESTING = "pen_testing";
export const EXPLOIT = "exploit";

export const orderedCategories: Category[] = [
  NETWORK,
  IAM,
  CLOUD_SEC_OPS,
  NIX,
  ICS_IOT,
  ENGINEER,
  ASSET,
  MGMT,
  MGMT_LEFT,
  GRC,
  MGMT_RIGHT,
  TEST,
  SOFTWARE,
  BLUEOPS,
  FORENSICS,
  INCIDENT_HANDLING,
  REDOPS,
  PEN_TESTING,
  EXPLOIT,
];

export const listOrderedCategories: Category[] = [
  NETWORK,
  IAM,
  ENGINEER,
  CLOUD_SEC_OPS,
  NIX,
  ICS_IOT,
  ASSET,
  MGMT,
  MGMT_LEFT,
  MGMT_RIGHT,
  GRC,
  TEST,
  SOFTWARE,
  BLUEOPS,
  FORENSICS,
  INCIDENT_HANDLING,
  REDOPS,
  PEN_TESTING,
  EXPLOIT,
];

export const mainCategories: Category[] = [NETWORK, IAM, ENGINEER, ASSET, MGMT, TEST, SOFTWARE, BLUEOPS, REDOPS];

export const mainCategoryWithSubCategory: Category[] = [ENGINEER, MGMT, BLUEOPS, REDOPS];

export const subCategories: Category[] = [
  CLOUD_SEC_OPS,
  NIX,
  ICS_IOT,
  MGMT_LEFT,
  GRC,
  MGMT_RIGHT,
  FORENSICS,
  INCIDENT_HANDLING,
  PEN_TESTING,
  EXPLOIT,
];

export const subCategoryMapping: SubCategoryMap = {
  [ENGINEER]: [CLOUD_SEC_OPS, NIX, ICS_IOT],
  [MGMT]: [MGMT_LEFT, GRC, MGMT_RIGHT],
  [BLUEOPS]: [FORENSICS, INCIDENT_HANDLING],
  [REDOPS]: [PEN_TESTING, EXPLOIT],
};

export const subCategoryParentCategory: SubCategoryParentCategoryMap = {
  [CLOUD_SEC_OPS]: ENGINEER,
  [NIX]: ENGINEER,
  [ICS_IOT]: ENGINEER,
  [MGMT_LEFT]: MGMT,
  [GRC]: MGMT,
  [MGMT_RIGHT]: MGMT,
  [FORENSICS]: BLUEOPS,
  [INCIDENT_HANDLING]: BLUEOPS,
  [PEN_TESTING]: REDOPS,
  [EXPLOIT]: REDOPS,
};

export const noControlCategories = [MGMT_LEFT, MGMT_RIGHT];

export const categoryDisplayNames: { [key in Category]: string | null } = {
  skilllevel: null,
  network: "Network",
  iam: "IAM",
  cloud_sec_ops: "Cloud Security & Operations",
  nix: "NIX",
  ics_iot: "ICS & IoT",
  engineer: "Engineer",
  asset: "Asset",
  mgmt: "Management",
  mgmt_left: null,
  mgmt_right: null,
  grc: "GRC",
  test: "Testing",
  software: "Software",
  blueops: "Blue Team Ops",
  redops: "Red Team Ops",
  forensics: "Forensics",
  incident_handling: "Incident Handling",
  pen_testing: "Pen Testing",
  exploit: "Exploit",
};

export const skillLevelDisplayNames: { [key: string]: string } = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  expert: "Expert",
};
