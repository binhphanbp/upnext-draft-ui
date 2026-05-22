import type { ElementType } from "react";

export type Role = "candidate" | "employer" | "admin";

export type RouteItem = {
  path: string;
  label: string;
  role: Role | "access";
  icon: ElementType;
  badge?: string;
};

export type Job = {
  title: string;
  company: string;
  place: string;
  salary: string;
  match: number;
  trust: number;
  tags: string[];
  status: string;
  posted: string;
  applicants: number;
  model: "Remote" | "Hybrid" | "Onsite";
};

export type Candidate = {
  name: string;
  role: string;
  job: string;
  match: number;
  exp: string;
  salary: string;
  stage: string;
  skills: string[];
  reason: string;
};

export type PipelineItem = {
  id: string;
  title: string;
  person: string;
  sla: string;
  tag: string;
  match: number;
};

export type PipelineColumn = {
  id: string;
  title: string;
  color: string;
  bg: string;
  items: PipelineItem[];
};
