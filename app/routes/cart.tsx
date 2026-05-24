import { useState, useEffect } from "react";
import { Link, useActionData, useRevalidator } from "react-router";

export const loader = async () => {
  // Return empty - cart items will be loaded on client side from localStorage
  return null;
};

export const action = async ({ request }: any) => {
  if (request.method === "POST") {
    const formData = await request.formData();
    const actionType = formData.get("actionType");
    const itemId = parseInt(formData.get("itemId"), 10);
    const quantity = parseInt(formData.get("quantity"), 10);

    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");

    if (actionType === "update") {
      const updatedCart = storedCart
        .map((item: any) =>
          item.id === itemId ? { ...item, quantity } : item
        )
        .filter((item: any) => item.quantity > 0);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else if (actionType === "remove") {
      const updatedCart = storedCart.filter((item: any) => item.id !== itemId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    return { success: true };
  }
};

export default function Cart() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const actionData = useActionData() as any;
  const revalidator = useRevalidator();
  const [promoCode, setPromoCode] = useState("");

  useEffect(() => {
    // Load cart items from localStorage on client side
    const loadCart = async () => {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");

      // Fetch product details for each cart item
      const products = await Promise.all(
        storedCart.map(async (item: any) => {
          try {
            const res = await fetch(`https://dummyjson.com/products/${item.id}`);
            if (!res.ok) return null;
            const product = await res.json();
            return {
              ...product,
              quantity: item.quantity,
            };
          } catch {
            return null;
          }
        })
      );

      setCartItems(products.filter((item) => item !== null));
      setIsLoading(false);
    };

    loadCart();
  }, [actionData]);

  const handleQuantityChange = (id: number, newQuantity: number) => {
    const formData = new FormData();
    formData.append("actionType", "update");
    formData.append("itemId", id.toString());
    formData.append("quantity", newQuantity.toString());

    fetch("?index", {
      method: "POST",
      body: formData,
    }).then(() => {
      // Reload cart after action
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const updatedCart = storedCart.map((item: any) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ).filter((item: any) => item.quantity > 0);
      
      const updatedItems = cartItems
        .map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
        .filter((item) => item.quantity > 0);
      setCartItems(updatedItems);
    });
  };

  const handleRemove = (id: number) => {
    const formData = new FormData();
    formData.append("actionType", "remove");
    formData.append("itemId", id.toString());

    fetch("?index", {
      method: "POST",
      body: formData,
    }).then(() => {
      // Remove item from state
      const updatedItems = cartItems.filter((item) => item.id !== id);
      setCartItems(updatedItems);
    });
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 20.0;
  const total = subtotal + shipping;

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-frist bg-white">
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
                  <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="#1F3044" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              </Link>

              <Link to="/user">
              <button className="hover:cursor-pointer hover:scale-110 transition ease-in-out duration-150">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z" stroke="#1F3044" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              </Link>

              <Link to="/cart">
                <button className="hover:cursor-pointer  hover:scale-110 transition ease-in-out duration-150">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.48 2.64C18.304 2.40533 18.216 2.288 18.1045 2.20338C18.0057 2.12842 17.8938 2.0725 17.7746 2.03845C17.64 2 17.4933 2 17.2 2H6.8C6.50667 2 6.36 2 6.22539 2.03845C6.10616 2.0725 5.9943 2.12842 5.89552 2.20338C5.784 2.288 5.696 2.40533 5.52 2.64L3.96 4.72C3.65102 5.13198 3.49652 5.33797 3.50011 5.51039C3.50323 5.66044 3.57358 5.80115 3.69175 5.89368C3.82754 6 4.08503 6 4.6 6H19.4C19.915 6 20.1725 6 20.3083 5.89368C20.4264 5.80115 20.4968 5.66044 20.4999 5.51039C20.5035 5.33797 20.349 5.13198 20.04 4.72L18.48 2.64ZM5.52 2.64L3.64 5.14666C3.40254 5.46328 3.28381 5.62159 3.1995 5.79592C3.12469 5.95062 3.07012 6.11431 3.03715 6.28296C3 6.47301 3 6.6709 3 7.06666L3 18.8C3 19.9201 3 20.4802 3.21799 20.908C3.40973 21.2843 3.71569 21.5903 4.09202 21.782C4.51984 22 5.07989 22 6.2 22L17.8 22C18.9201 22 19.4802 22 19.908 21.782C20.2843 21.5903 20.5903 21.2843 20.782 20.908C21 20.4802 21 19.9201 21 18.8V7.06667C21 6.6709 21 6.47301 20.9628 6.28296C20.9299 6.11431 20.8753 5.95062 20.8005 5.79592C20.7162 5.62159 20.5975 5.46328 20.36 5.14667L18.48 2.64M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" stroke="#1F3044" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pt-4 pb-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4 font-sans">Your cart is empty</p>
                <Link to="/" className="text-frist hover:underline font-sans">
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-4 pb-6 border-b border-frist">
                    {/* Product Image */}
					<Link to={`/products/${item.id}`} className="w-full sm:w-40 sm:h-40 h-40 bg-gray-200 flex-shrink-0">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <Link to={`/products/${item.id}`} className="font-light text-frist mb-2 hover:underline line-clamp-2 font-sans">
                          {item.title}
                        </Link>
                        <p className="text-frist font-light text-sm mb-3 font-sans">${item.price.toFixed(2)}</p>
                      </div>

                      {/* Quantity Controls and Total */}
                      <div className="flex items-end justify-between gap-4">
                        <div className="flex items-center gap-2 md:gap-4 flex-wrap">
                        <div className="flex border border-frist rounded-xl items-center gap-2">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center rounded-xl justify-center hover:bg-gray-100"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-sans">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center rounded-xl justify-center hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="text-gray-400 hover:text-red-600"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M16 6V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H11.2C10.0799 2 9.51984 2 9.09202 2.21799C8.71569 2.40973 8.40973 2.71569 8.21799 3.09202C8 3.51984 8 4.0799 8 5.2V6M10 11.5V16.5M14 11.5V16.5M3 6H21M19 6V17.2C19 18.8802 19 19.7202 18.673 20.362C18.3854 20.9265 17.9265 21.3854 17.362 21.673C16.7202 22 15.8802 22 14.2 22H9.8C8.11984 22 7.27976 22 6.63803 21.673C6.07354 21.3854 5.6146 20.9265 5.32698 20.362C5 19.7202 5 18.8802 5 17.2V6" stroke="#1F3044" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>

                        </button>
                      </div>
                        <div className="text-right">
                          <p className="font-semibold text-frist font-sans">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Summary */}
          <aside className="w-full lg:w-80 lg:flex-shrink-0">
            <div className="border border-frist rounded-lg p-4 md:p-6 overflow-hidden">
              <h3 className="text-lg font-semibold mb-6 text-frist font-sans">Cart Summary</h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700 font-sans">Subtotal</span>
                  <span className="text-frist font-medium font-sans">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700 font-sans">Shipping</span>
                  <span className="text-frist font-medium font-sans">${shipping.toFixed(2)}</span>
                </div>
                <div className="border-frist pt-3 flex justify-between">
                  <span className="font-semibold text-frist font-sans">Total</span>
                  <span className="font-semibold text-frist font-sans">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button className="w-full bg-frist text-white py-3 rounded-lg font-semibold hover:opacity-80 transition mb-6 font-sans">
                Check out
              </button>

              <div className="text-center text-xs text-frist mb-6 border-b border-frist pb-6 font-sans">
                Or pay with PayPal
              </div>

              {/* Promo Code */}
              <div>
                <label className="block text-xs text-frist font-sans">
                  Promo code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-500 font-sans"
                  />
                  <button className="px-4 py-2 bg-frist text-white rounded-lg text-sm font-semibold hover:opacity-80 transition flex-shrink-0 font-sans">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
