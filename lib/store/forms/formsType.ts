export interface FormField {
  id: string;
  type: "text" | "number" | "textarea" | "select" | "checkbox";
  label: string;
  name?: string;
  placeholder?: string;
  required: boolean;
  options?: string[]; // For select type
}

export interface FormsData {
  id?:string;
  name?: string;
  fields?: FormField[];
}
