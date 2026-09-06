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
export const products=[
    {
        title:"Aurora Wireless Headphones",
        price:89.99,
        description:"Comfortable wireless headphones with clear sound and soft ear cushions."
    },
    {
        title:"Nova Mechanical Keyboard",
        price:74.50,
        description:"A compact mechanical keyboard with RGB lighting and tactile switches."
    },
    {
        title:"Orbit Smart Desk Lamp",
        price:39.99,
        description:"A modern desk lamp with adjustable brightness and warm or cool light."
    },
    {
        title:"Pixel USB-C Hub",
        price:29.95,
        description:"A lightweight USB-C hub with HDMI, USB-A, USB-C and SD card ports."
    },
    {
        title:"CloudSoft Laptop Sleeve",
        price:24.00,
        description:"A slim laptop sleeve with soft padding and a water-resistant exterior."
    }
]

export async function getproduct(token:string){
    const response=await strapiFetch<productresponse>(
        "/api/products",token,
    )
    return response.data
}