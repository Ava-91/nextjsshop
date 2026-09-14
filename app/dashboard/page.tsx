import { auth } from "@/auth";
import { getproduct } from "@/lib/products";

export default async function dashboardpage() {
  const session = await auth();

  const products = await getproduct(
    session!.user.strapiToken//من میدونم سیژنی هست پس تو نیازی نیست بری بررسی کنی ببینی null هست یا نه
  );

  return (
    <div>
        <main>
            <div>
                <h2>dashboard</h2>
                <p>Welcome back {session?.user?.name}</p>
            </div>
        </main>
        <div>
            {products.map((product)=>(
                <article className="" key={product.id}>
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                    <p>${product.price}</p>
                </article>
            ))}
        </div>
    </div>
  );
}