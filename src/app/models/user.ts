export interface User { 
    id:string
    created:number
    karma:number
    about?:string
    delay?:number
    submitted?:number[]
}