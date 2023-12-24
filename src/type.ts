import { Dispatch } from "react";

export interface Student {
  full_name: string;
  year: string;
  study_field: string;
  site: string;
}
export interface propsField {
  Name: string;
  Type: string;
  Width: string | number;
  Option?: string[] | undefined;
  setObject: Dispatch<setObject>;
  getTarget: (target: string, value: string) => void;
}
export interface setObject {
  name: string;
  year: string;
  study: string;
  site: string;
}
