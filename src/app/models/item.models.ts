export class Item{
    id!:number
    by!:string
    time!:number
    type!: string
    title!:string
    text!:string
    parent!:number
    deleted!:boolean
    kids!:number[]
    url!:string
    score!:number
    descendants!:number
    parts!:number[]

    protected constructor(){}
}
