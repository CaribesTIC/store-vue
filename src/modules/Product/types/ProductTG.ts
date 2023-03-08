export interface ProductTG {
    rows: Rows;
}

export interface Rows {
    current_page:   number;
    data:           ProductRow[];
    first_page_url: string;
    from:           number;
    last_page:      number;
    last_page_url:  string;
    links:          Link[];
    next_page_url:  string;
    path:           string;
    per_page:       number;
    prev_page_url:  null;
    to:             number;
    total:          number;
}

export interface ProductRow {
    id:       number;
    product:  string;
    category: string;
    mark:     string;
}

export interface Link {
    url:    null | string;
    label:  string;
    active: boolean;
}