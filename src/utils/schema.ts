export interface Define {
  type: string;
  min: string;
  max: string;
  start: string;
  step: string;
  unit: string;
}

export interface Property {
  id: string;
  name: string;
  desc: string;
  mode: string;
  define: Define;
  required: boolean;
}

export interface Mapping {
  0: string;
  1: string;
}

export interface Define {
  type: string;
  mapping: Mapping;
}

export interface Param {
  id: string;
  name: string;
  desc: string;
  define: Define;
}

export interface Event {
  id: string;
  name: string;
  desc: string;
  type: string;
  required: boolean;
  params: Param[];
}

export interface Define {
  type: string;
}

export interface Input {
  id: string;
  name: string;
  define: Define;
}

export interface Define {
  type: string;
  min: string;
  max: string;
  start: string;
  step: string;
  unit: string;
}

export interface Output {
  id: string;
  name: string;
  define: Define;
}

export interface Action {
  id: string;
  name: string;
  desc: string;
  input: Input[];
  output: Output[];
  required: boolean;
}

export interface Profile {
  productId: string;
  categoryId: string;
}

export interface RootObject {
  version: string;
  properties: Property[];
  events: Event[];
  actions: Action[];
  profile: Profile;
}
