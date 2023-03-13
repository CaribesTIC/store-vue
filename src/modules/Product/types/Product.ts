export interface Product{
  id?:                   string;
  company_id?:           string | null;
  name:                 string | null;
  category_id:          string | null;
  mark_id:              string | null;
  measure_unit_type_id: string | null;
  measure_unit_id:      string | null;
  measure_unit?:         string | null;
  photo?:                string | null;
  user_insert_id?:       string | null;
  user_update_id?:       string | null;
  user_edit_id?:         string | null;
  editing?:              boolean | null;
  created_at?:           Date | null;
  updated_at?:           Date | null;
  _method?:              'PUT'
}

export interface Category {
  id:        string;
  name:      string;
  family:    string;
  parent_id: string;
  level:     number;
}

export interface Mark {
  id:          string;
  company_id:  string;
  name:        string;
  producer_id: string;
  created_at:  Date;
  updated_at:  Date;
}

export interface MeasureUnitType {
  id:          string;
  description: string;
}

export interface MeasureUnit {
  id:          string;
  name: string;
}