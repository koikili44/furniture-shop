import { useState, useEffect, useMemo } from 'react';
import productsData from '../data/products';
import ProductCard from './ProductCard';

const Products = () => {
  const [products] = useState(productsData);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = useMemo(() => {
    const cats = ['All'];
    products.forEach(p => {
      if (!cats.includes(p.category)) cats.push(p.category);
    });
    return cats;
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchTerm]);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-wood-800 bg-clip-text text-transparent mb-6">
            Our Collection
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handcrafted furniture that combines elegance and functionality for modern living.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-xl font-semibold transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-wood-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-wood-100 shadow-md hover:shadow-lg'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search furniture..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full lg:w-auto px-6 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-gold-400 focus:outline-none shadow-md transition-all duration-300"
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-24">
            <p className="text-2xl text-gray-500">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;

