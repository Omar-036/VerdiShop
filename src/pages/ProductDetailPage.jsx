import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product details");
        const data = await response.json();
        setProduct(data);

        // Fetch related products
        const categoryResponse = await fetch(
          `https://fakestoreapi.com/products/category/${data.category}`
        );
        if (categoryResponse.ok) {
          const categoryData = await categoryResponse.json();
          // Filter out the current product and get 4 random related products
          const filtered = categoryData.filter((p) => p.id !== parseInt(id));
          const shuffled = [...filtered].sort(() => 0.5 - Math.random());
          setRelatedProducts(shuffled.slice(0, 4));
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/checkout");
  };

  if (loading)
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
      </div>
    );

  if (error)
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md mx-auto">
          <strong>Error: </strong> {error}
        </div>
      </div>
    );

  if (!product) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/"
        className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Products
      </Link>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
        <div className="md:flex">
          <div className="md:w-1/2 flex items-center justify-center p-8 bg-gray-50">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-96 object-contain"
            />
          </div>

          <div className="md:w-1/2 p-8">
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                {product.category}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {product.title}
            </h1>

            <div className="flex items-center mb-6">
              <div className="flex text-yellow-400">
                {"★".repeat(Math.round(product.rating.rate))}
                {"☆".repeat(5 - Math.round(product.rating.rate))}
              </div>
              <span className="ml-2 text-gray-600">
                {product.rating.rate} ({product.rating.count} reviews)
              </span>
            </div>

            <p className="text-2xl font-bold text-indigo-600 mb-6">
              ${product.price.toFixed(2)}
            </p>

            <p className="text-gray-700 mb-8">{product.description}</p>

            <div className="flex items-center mb-8">
              <span className="text-gray-700 mr-4">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded">
                <button
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-4 py-1 w-12 text-center">{quantity}</span>
                <button
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold py-3 px-6 rounded-lg transition duration-300"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />

              // <div
              //   key={product.id}
              //   className="bg-white rounded-lg shadow-md overflow-hidden"
              // >
              //   <Link to={`/product/${product.id}`}>
              //     <div className="h-48 flex items-center justify-center p-4 bg-gray-50">
              //       <img
              //         src={product.image}
              //         alt={product.title}
              //         className="max-h-full max-w-full object-contain"
              //       />
              //     </div>
              //     <div className="p-4">
              //       <h3 className="font-semibold text-gray-800 truncate">
              //         {product.title}
              //       </h3>
              //       <div className="mt-2 flex justify-between items-center">
              //         <span className="text-lg font-bold text-indigo-600">
              //           ${product.price.toFixed(2)}
              //         </span>
              //       </div>
              //     </div>
              //   </Link>
              // </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
