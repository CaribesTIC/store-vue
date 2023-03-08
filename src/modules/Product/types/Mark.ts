export interface Mark {
    id?:   number;
    name: string;
    _method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
}