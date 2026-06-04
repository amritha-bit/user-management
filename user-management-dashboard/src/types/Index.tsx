export interface Geo{
    lat:string;
    lng:string;
}
export interface Address{
    street:string;
    suite:string;
    city:string;
    zipcode:string;
    geo:string;
}
export interface User{
    id:number;
    name:string;
    username:string;
    email:string;
    address:string;
    phone:string;
    website:string;
    company:string;
}
export type SortField ='name ' | 'username' | 'email';
export type SortOrder = 'asc' | 'desc';
export type viewMode = 'card' | 'table';
export interface FilterState {
    city: string;
    company: string;
}