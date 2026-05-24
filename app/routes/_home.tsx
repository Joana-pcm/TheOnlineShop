import { useLoaderData, Link } from "react-router";
import { useState, useEffect } from "react";

export const loader = async ({ request }: any) => {
  const url = new URL(request.url);
  const page = Math.max(1, parseInt(url.searchParams.get("page") || "1", 10));
  const category = url.searchParams.get("category") || null;
  const sort = url.searchParams.get("sort") || "latest";
  const pageSize = 9;
  const skip = (page - 1) * pageSize;

  let res;
  if (category) {
    res = await fetch(`https://dummyjson.com/products/category/${category}?limit=${pageSize}&skip=${skip}`);
  } else {
    res = await fetch(`https://dummyjson.com/products?limit=${pageSize}&skip=${skip}`);
  }
  let json = await res.json();
  let products = json.products;

  // Sort products
  if (sort === "price-low-high") {
    products = products.sort((a: any, b: any) => a.price - b.price);
  } else if (sort === "price-high-low") {
    products = products.sort((a: any, b: any) => b.price - a.price);
  } else if (sort === "latest") {
    products = products.reverse();
  } else {
    products = products.sort((a: any, b: any) => a.id - b.id);
  }

  return {
    products,
    total: json.total ? json.total : 0,
    page,
    pageSize,
    category,
    sort,
  };
};

export default function Home() {
  const { products, total, page, pageSize, category, sort } = useLoaderData() as any;
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(category);
  const [selectedSort, setSelectedSort] = useState<string>(
    sort === "latest" ? "" : sort
  );
  const [showCategories, setShowCategories] = useState(false);
  const [showSort, setShowSort] = useState(false);
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("https://dummyjson.com/products/categories");
      const cats = await res.json();
      setCategories(cats);
    };
    fetchCategories();
  }, []);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const visiblePageCount = 5;
  const visiblePageStart = Math.max(
    1,
    Math.min(page - Math.floor(visiblePageCount / 2), totalPages - visiblePageCount + 1)
  );
  const visiblePageEnd = Math.min(totalPages, visiblePageStart + visiblePageCount - 1);

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-frist">
        <div className="max-w-7xl px-4 py-4 mx-auto">
          <div className="flex justify-between items-center gap-6">
            <a href="/">
              <h1 className="font-title text-frist text-2xl tracking-widest">THE ONLINE STORE</h1>
            </a>
            <div className="flex items-center gap-6">
              <nav className="hidden md:flex items-center justify-center gap-6 text-frist font-sans">
                <a href="/" className="hover:underline">Home</a>
                <a href="/shop" className="hover:underline">Shop</a>
                <a href="/about" className="hover:underline">About</a>
                <a href="/contact" className="hover:underline">Contact</a>
                <a href="/blog" className="hover:underline">Blog</a>
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        <div className="flex gap-4 md:gap-8 flex-col md:flex-row-reverse">
          {/* Mobile Categories Dropdown */}
          <div className="md:hidden mb-6 ml-2 mr-2">
            <button 
              onClick={() => setShowCategories(!showCategories)}
              className="w-full px-3 py-2 border border-frist rounded-md text-frist font-sans font-xs flex justify-between items-center"
            >
              <span className="font-sans">Categories</span>
              <span className={`transition-transform duration-300 ease-in-out ${showCategories ? 'rotate-180' : ''}`}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 9L12 15L18 9" stroke="#1F3044" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showCategories ? 'max-h-2000 opacity-100' : ' max-h-0 opacity-0'}`}>
              <div className="mt-1 p-2 border border-frist rounded-md space-y-2 bg-white">
                <button
                  onClick={() => window.location.href = `/?page=1`}
                  className="w-full text-left px-3 py-2 text-frist hover:bg-gray-100 rounded font-sans"
                >
                  All Categories
                </button>
                {categories.map((cat: any) => (
                  <button
                    key={cat.slug}
                    onClick={() => window.location.href = `/?category=${cat.slug}&page=1`}
                    className="w-full text-left px-3 py-2 text-frist hover:bg-gray-100 rounded capitalize text-xs font-sans"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Categories */}
          <aside className="hidden md:block w-48 flex-shrink-0">

            <div className="border-b border-frist mb-6 pb-4">
              <h3 className="text-frist mb-3 font-sans">Categories</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-frist cursor-pointer font-sans">
                  <input 
                    type="checkbox" 
                    checked={selectedCategory === null}
                    onChange={() => window.location.href = `/?page=1`}
                  />
                  <span>All Categories</span>
                </label>
                {categories.map((cat: any) => (
                  <label key={cat.slug} className="flex items-center gap-2 text-frist cursor-pointer font-sans">
                    <input 
                      type="checkbox"
                      checked={selectedCategory === cat.slug}
                      onChange={() => window.location.href = `/?category=${cat.slug}&page=1`}
                    />
                    <span className="capitalize font-xs">{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Product Grid and Controls */}
          <div className="flex-1">

          {/* Sort and Pagination Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 ml-2 mr-2">
              <div className="flex-shrink-0 w-full sm:w-48 relative">
                <button 
                  onClick={() => setShowSort(!showSort)}
                  className="w-full px-3 py-2 border border-frist rounded-md text-frist font-sans font-xs flex justify-between items-center"
                >
                  <span className="font-sans">{selectedSort ? selectedSort.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Sort By'}</span>
                  <span className={`transition-transform duration-300 ${showSort ? 'rotate-180' : ''}`}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 9L12 15L18 9" stroke="#1F3044" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                </button>
                <div className={`absolute top-full left-0 right-0 z-10 mt-1 overflow-hidden transition-all duration-300 ease-in-out ${showSort ? 'max-h-56 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="p-2 border border-frist rounded-md space-y-2 bg-white">
                    <button
                      onClick={() => {
                        setSelectedSort('');
                        window.location.href = `/?${category ? `category=${category}&` : ''}sort=latest&page=1`;
                      }}
                      className="w-full text-left px-3 py-2 text-frist hover:bg-gray-100 rounded font-sans"
                    >
                      Latest
                    </button>
                    <button
                      onClick={() => {
                        setSelectedSort('price-low-high');
                        window.location.href = `/?${category ? `category=${category}&` : ''}sort=price-low-high&page=1`;
                      }}
                      className="w-full text-left px-3 py-2 text-frist hover:bg-gray-100 rounded font-sans"
                    >
                      Price: Low to High
                    </button>
                    <button
                      onClick={() => {
                        setSelectedSort('price-high-low');
                        window.location.href = `/?${category ? `category=${category}&` : ''}sort=price-high-low&page=1`;
                      }}
                      className="w-full text-left px-3 py-2 text-frist hover:bg-gray-100 rounded font-sans"
                    >
                      Price: High to Low
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-frist text-gray-600 flex items-center gap-2 text-sm font-sans">
              Showing {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, total)} of {total}
              </div>
          </div>

            {/* Products Grid */}
            <section className="w-full flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8 justify-items-center">
              {products.map((p: any) => (
                <article key={p.id}>
                  <Link to={`products/${p.id}`} className="block mb-3">
                    {p.thumbnail ? (
                      <div className="w-full h-full max-h-80 max-w-80 overflow-hidden">
                        <img src={p.thumbnail} alt={p.title} className="transition ease-in-out duration-300 hover:scale-110 w-full h-full object-cover bg-gray-200 " />
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gray-200 " />
                    )}
                  </Link>
                  <Link to={`products/${p.id}`} className="block ">
                    <h3 className="text-frist line-clamp-2 hover:underline font-sans">{p.title}</h3>
                  </Link>
                  <div className="text-frist font-sans">${p.price}</div>
                </article>
              ))}
            </div>
            </section>

            {/* Pagination */}
            <nav className="flex items-center justify-end gap-1 md:gap-2 flex-wrap" aria-label="Pagination">
              {page > 1 && (
                <a href={`?${category ? `category=${category}&` : ""}sort=${sort}&page=${page - 1}`} className="px-3 py-1 text-frist rounded-md hover:bg-gray-100">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 18L9 12L15 6" stroke="#1F3044" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                </a>
              )}

              {Array.from({ length: totalPages }).map((_, i) => {
                const p = i + 1;
                if (p < visiblePageStart || p > visiblePageEnd) return null;
                return (
                  <a
                    key={p}
                    href={`?${category ? `category=${category}&` : ""}sort=${sort}&page=${p}`}
                    className={`px-3 py-1 font-sans ${
                      p === page ? "bg-frist rounded-md text-white" : " text-frist transition ease-in-out duration-300 hover:bg-gray-200 rounded-md"
                    }`}
                  >
                    {p}
                  </a>
                );
              })}
              {page < totalPages && (
                <a href={`?${category ? `category=${category}&` : ""}sort=${sort}&page=${page + 1}`} className="px-3 py-1 text-frist rounded-md transition ease-in-out duration-300 hover:bg-gray-200">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 18L15 12L9 6" stroke="#1F3044" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                </a>
              )}
            </nav>
          </div>
        </div>
      </div>
    </main>
  );
}
