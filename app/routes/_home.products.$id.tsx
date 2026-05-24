import { useLoaderData, Link } from "react-router";
import { useState } from "react";

export const loader = async ({ params }: any) => {
	const id = params.id;
	const res = await fetch(`https://dummyjson.com/products/${id}`);
	if (!res.ok) {
		throw new Response("Not Found", { status: 404 });
	}
	const product = await res.json();
	return product;
};

export default function ProductDetail() {
	const product = useLoaderData() as any;
	const [mainImage, setMainImage] = useState(product.images && product.images.length > 0 ? product.images[0] : product.thumbnail || null);	
	return (
		<main className="min-h-screen bg-white">
			{/* Header */}
			<header className="border-b border-frist">
				<div className="max-w-7xl px-4 py-4 mx-auto">
					<div className="flex justify-between items-center gap-6">
						<Link to="/">
							<h1 className="font-title text-frist text-2xl tracking-widest">THE ONLINE STORE</h1>
						</Link>
						<div className="flex items-center gap-6">
							<nav className="hidden md:flex items-center justify-center gap-6 text-frist font-sans">
								<a href="/" className="hover:underline">Home</a>
								<a href="/shop" className="hover:underline">Shop</a>
								<a href="/about" className="hover:underline">About</a>
								<a href="/contact" className="hover:underline">Contact</a>
								<a href="/account" className="hover:underline">Account</a>
							</nav>
						</div>

            <div className="flex items-center gap-6 mt-1 mr-2">
              <Link to="/search">
              <button className="hover:cursor-pointer hover:scale-110 transition ease-in-out duration-150">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#1F3044" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              </Link>

              <Link to="/user">
              <button className="hover:cursor-pointer hover:scale-110 transition ease-in-out duration-150">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z" stroke="#1F3044" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              </Link>

              <Link to="/cart">
                <button className="hover:cursor-pointer  hover:scale-110 transition ease-in-out duration-150">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.48 2.64C18.304 2.40533 18.216 2.288 18.1045 2.20338C18.0057 2.12842 17.8938 2.0725 17.7746 2.03845C17.64 2 17.4933 2 17.2 2H6.8C6.50667 2 6.36 2 6.22539 2.03845C6.10616 2.0725 5.9943 2.12842 5.89552 2.20338C5.784 2.288 5.696 2.40533 5.52 2.64L3.96 4.72C3.65102 5.13198 3.49652 5.33797 3.50011 5.51039C3.50323 5.66044 3.57358 5.80115 3.69175 5.89368C3.82754 6 4.08503 6 4.6 6H19.4C19.915 6 20.1725 6 20.3083 5.89368C20.4264 5.80115 20.4968 5.66044 20.4999 5.51039C20.5035 5.33797 20.349 5.13198 20.04 4.72L18.48 2.64ZM5.52 2.64L3.64 5.14666C3.40254 5.46328 3.28381 5.62159 3.1995 5.79592C3.12469 5.95062 3.07012 6.11431 3.03715 6.28296C3 6.47301 3 6.6709 3 7.06666L3 18.8C3 19.9201 3 20.4802 3.21799 20.908C3.40973 21.2843 3.71569 21.5903 4.09202 21.782C4.51984 22 5.07989 22 6.2 22L17.8 22C18.9201 22 19.4802 22 19.908 21.782C20.2843 21.5903 20.5903 21.2843 20.782 20.908C21 20.4802 21 19.9201 21 18.8V7.06667C21 6.6709 21 6.47301 20.9628 6.28296C20.9299 6.11431 20.8753 5.95062 20.8005 5.79592C20.7162 5.62159 20.5975 5.46328 20.36 5.14667L18.48 2.64M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="#1F3044" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </Link>
            </div>
					</div>
				</div>
			</header>

			{/* Product Content */}
			<div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
					{/* Product Image - Left Side */}
					<div className="flex items-center">
						{product.images && product.images.length > 0 ? (
							<img 
								src={mainImage} 
								alt={product.title} 
								className="w-full h-auto object-cover bg-gray-100"
							/>
						) : product.thumbnail ? (
							<img 
								src={product.thumbnail} 
								alt={product.title} 
								className="w-full h-auto object-cover bg-gray-100"
							/>
						) : (
							<div className="w-full h-96 bg-gray-100 flex items-center justify-center">
								<span className="text-gray-400">No image available</span>
							</div>
						)}
					</div>

					{/* Product Info - Right Side */}
					<div className="flex flex-col justify-between">
						<h1 className="text-2xl md:text-3xl font-ubu font-bold text-frist mb-3">{product.title}</h1>
						<p className="text-2xl md:text-3xl font-ubu font-bold text-frist mb-6">${product.price.toFixed(2)}</p>

						{/* Add to Cart Button */}
						<button 
							onClick={() => {
								const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
								const existingItem = existingCart.find((item: any) => item.id === product.id);
								
								if (existingItem) {
									existingItem.quantity += 1;
								} else {
									existingCart.push({ id: product.id, quantity: 1 });
								}
								
								localStorage.setItem("cart", JSON.stringify(existingCart));
								window.location.href = "/cart";
							}}
							className="hover:cursor-pointer w-full bg-frist text-white py-3 px-6 font-roboto font-semibold transition duration-300 ease-in-out hover:opacity-80 mb-8"
						>
							Add to Cart
						</button>

						{/* Product Details Section */}
						<div className="border-t border-frist pt-6">
							<h3 className="font-semibold font-ubu text-frist mb-3">Product Details</h3>
							<p className="text-gray-700 font-ubu text-sm leading-relaxed">{product.description}</p>
						</div>

						{/* Additional Info */}
						{product.category && (
							<div className="border-t border-frist mt-6 pt-6">
								<p className="text-sm text-gray-600 font-ubu">
									<span className="font-semibold text-frist">Category:</span> {product.category}
								</p>
							</div>
						)}
						{product.stock !== undefined && (
							<div className="mt-3">
								<p className="text-sm text-gray-600 font-ubu">
									<span className="font-semibold text-frist">In Stock:</span> {product.stock > 0 ? 'Yes' : 'No'}
								</p>
							</div>
						)}
						{/* Image Gallery */}
						{product.images && product.images.length > 1 && (
							<div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 md:gap-4 mt-6 justify-start">
								{product.images.map((src: string, i: number) => (
									<img 
										key={i} 
										src={src} 
										alt={`${product.title} ${i + 1}`} 
										onClick={() => {
											mainImage !== src && setMainImage(src);
		}}
										className="w-full h-16 sm:h-20 md:h-24 object-cover rounded bg-gray-100 cursor-pointer hover:opacity-80 transition"
									/>
								))}
							</div>
						)}
					</div>
				</div>

			</div>
		</main>
	);
}
