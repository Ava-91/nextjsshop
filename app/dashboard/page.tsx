import { auth } from "@/auth";
import { getproduct } from "@/lib/products";

export default async function dashboardpage() {
  const session = await auth();
  const products = await getproduct(session!.user.strapiToken);

  return (
    <div className="dashboard">
      <main>
        <div>
          <h2>dashboard</h2>
          <p>Welcome back {session?.user?.name}</p>
        </div>
      </main>
      <div className="product-grid">
        {products.map((product)=>(
          <article className="product-card" key={product.id}>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p className="product-price">{"$"}{product.price}</p>
          </article>
        ))}
      </div>
    </div>
  );
}