export interface Geo{
    lat:string;
    lng:string;
}
export interface Address{
    street:string;
    suite:string;
    city:string;
    zipcode:string;
    geo:Geo;
}
export interface Company{
    name:string;
    catchPhrase:string;
    bs:string;
}
export interface User{
    id:number;
    name:string;
    username:string;
    email:string;
    address:Address ;
    phone:string;
    website:string;
    company:Company;
}
export type SortField =keyof Pick<User, 'name' | 'username' | 'email'>;
export type SortOrder = 'asc' | 'desc';
export type ViewMode = 'card' | 'table';
export interface FilterState {
    city: string;
    company: string;
}