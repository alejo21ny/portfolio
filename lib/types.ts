// Shape of every project shown on the site. Diagrams (architecture, workflows,
// data model) are plain data here and rendered by the components in
// app/components/diagrams — no image assets to keep in sync with the code.

export type Status = "Live" | "Staging" | "Built & tested" | "In development";

export type StepKind = "user" | "auto" | "ai" | "data" | "external" | "guard";

export type WorkflowStep = {
  label: string;
  detail?: string;
  kind?: StepKind;
};

export type Workflow = {
  title: string;
  summary?: string;
  steps: WorkflowStep[];
};

export type ArchNode = {
  label: string;
  detail?: string;
};

export type ArchLane = {
  name: string;
  nodes: ArchNode[];
};

export type Architecture = {
  lanes: ArchLane[];
  // Key connections, read left-to-right across lanes ("A → B: why").
  flows: string[];
};

export type Entity = {
  name: string;
  fields: string[];
};

export type Relation = {
  from: string;
  to: string;
  cardinality: "1–1" | "1–N" | "N–N";
  label?: string;
};

export type DataModel = {
  entities: Entity[];
  relations: Relation[];
  note?: string;
};

export type Metric = {
  value: string;
  label: string;
};

export type Section = {
  title: string;
  body?: string;
  bullets?: string[];
};

export type Project = {
  slug: string;
  name: string;
  label: string;
  category: "Product" | "Platform" | "Integration" | "Automation" | "Web";
  status: Status;
  year: string;
  summary: string;
  problem: string;
  solution: string;
  tags: string[];
  stack: { group: string; items: string[] }[];
  metrics: Metric[];
  github?: string;
  privateRepo?: boolean;
  live?: string;
  featured?: boolean;
  architecture?: Architecture;
  workflows?: Workflow[];
  dataModel?: DataModel;
  ai?: string[];
  sections?: Section[];
};

export type Screenshot = {
  src: string;
  device: "desktop" | "mobile";
  alt: { en: string; es: string };
};
