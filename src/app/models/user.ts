export interface User { 
    id:string
    creatd:number
    karma:number
    about?:string
    delay?:number
    submissions?:number[]
}