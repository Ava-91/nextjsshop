//در منزل یک محصول درست کنیم و چند تا محصول ایجاد بشه که شامل title,price,desc باشه.
 //در منزل یک product درست کنید چند تا محصول ایجاد بشه که شامل 
//title price description

import { strapiFetch } from "./strapi"

 //در استراپی این کارها انجام میشود
export type product={
    id:string,
    documentId:string,
    title:string,
    price:number,
    description:string,
}
type productresponse={
    data: product []
}
export async function getproduct(token:string){
    const response=await strapiFetch<productresponse>(
        "/api/products",token,
    )
    return response.data
}