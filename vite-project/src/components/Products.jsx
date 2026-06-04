import { useState, useMemo, useEffect } from 'react';
import ProductCard from './ProductCard';
import { fetchProducts } from '../services/api';

// Asset imports
import bigBookShelfImg from "../assets/big-book-shelf.png";
import bigSittingRoomSofaImg from "../assets/big-sitting-room-sofa.avif";
import bookShelfImg from "../assets/book-shelf.avif";
import chairSofaImg from "../assets/chair-sofa.avif";
import chairImg from "../assets/chair.avif";
import citySofaImg from "../assets/city-sofa.avif";
import clearDiningImg from "../assets/clear-dining.avif";
import darkSofaImg from "../assets/dark-sofa.avif";
import dining4Img from "../assets/dining-4.avif";
import dining2Img from "../assets/dining-2.avif";
import diningImg from "../assets/dining.avif";
import fullDiningImg from "../assets/full-dining.webp";
import fullSofaImg from "../assets/full-sofa.avif";
import furnitureHeroImg from "../assets/furniture-hero.avif";
import furnitureSofaImg from "../assets/furniture-sofa.avif";
import jonaSofaImg from "../assets/jona-sofa.avif";
import kitchenCabinetDiningImg from "../assets/kitchen-cabinet-and-dining.avif";
import livingRoomSofaImg from "../assets/living-room-sofa.avif";
import multiSofaImg from "../assets/multi-sofa.avif";
import officeChairImg from "../assets/office-chair.avif";
import officeLoungeImg from "../assets/office-lounge.avif";
import officeShelfImg from "../assets/office-shelf.avif";
import officeTableImg from "../assets/office-table.avif";
import officeWork3Img from "../assets/office-work-3.avif";
import officeWorkstationImg from "../assets/office-workstation.avif";
import palourSofaImg from "../assets/palour-sofa.avif";
import roundDiningImg from "../assets/round-dining.avif";
import shelfSimpleImg from "../assets/shelf-simple.avif";
import shelfImg from "../assets/shelf.avif";
import simpleDiningImg from "../assets/simple-dining.avif";
import smallWorkstationImg from "../assets/small-workstation.avif";
import sofaAgainImg from "../assets/sofa-again.avif";
import sofaGrImg from "../assets/sofa-gr.avif";
import sofaMainImg from "../assets/sofa-main.avif";
import sofaSetImg from "../assets/sofa-set.avif";
import svenSofaImg from "../assets/sven-sofa.avif";
import tvConsoleImg from "../assets/tv-console.avif";
import yellowSofaImg from "../assets/yellow-sofa.avif";

const imageMap = {
  'big-book-shelf.png': bigBookShelfImg,
  'big-sitting-room-sofa.avif': bigSittingRoomSofaImg,
  'book-shelf.avif': bookShelfImg,
  'chair-sofa.avif': chairSofaImg,
  'chair.avif': chairImg,
  'city-sofa.avif': citySofaImg,
  'clear-dining.avif': clearDiningImg,
  'dark-sofa.avif': darkSofaImg,
  'dining-4.avif': dining4Img,
  'dining-2.avif': dining2Img,
  'dining.avif': diningImg,
  'full-dining.webp': fullDiningImg,
  'full-sofa.avif': fullSofaImg,
  'furniture-hero.avif': furnitureHeroImg,
  'furniture-sofa.avif': furnitureSofaImg,
  'jona-sofa.avif': jonaSofaImg,
  'kitchen-cabinet-and-dining.avif': kitchenCabinetDiningImg,
  'living-room-sofa.avif': livingRoomSofaImg,
  'multi-sofa.avif': multiSofaImg,
  'office-chair.avif': officeChairImg,
  'office-lounge.avif': officeLoungeImg,
  'office-shelf.avif': officeShelfImg,
  'office-table.avif': officeTableImg,
  'office-work-3.avif': officeWork3Img,
  'office-workstation.avif': officeWorkstationImg,
  'palour-sofa.avif': palourSofaImg,
  'round-dining.avif': roundDiningImg,
  'shelf-simple.avif': shelfSimpleImg,
  'shelf.avif': shelfImg,
  'simple-dining.avif': simpleDiningImg,
  'small-workstation.avif': smallWorkstationImg,
  'sofa-again.avif': sofaAgainImg,
  'sofa-gr.avif': sofaGrImg,
  'sofa-main.avif': sofaMainImg,
  'sofa-set.avif': sofaSetImg,
  'sven-sofa.avif': svenSofaImg,
  'tv-console.avif': tvConsoleImg,
  'yellow-sofa.avif': yellowSofaImg,
};

const normalizeImage = (imagePath) => {
  if (!imagePath) return '';
  const filename = imagePath.split('/').pop();
  return imageMap[filename] || imagePath;
};

const normalizeCategory = (category) => {
  if (typeof category === 'string') return category;
  if (category && typeof category === 'object') return category.name || 'Uncategorized';
  return 'Uncategorized';
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/v1/products');

        const data = await res.json();
        const mapped = (data.data || []).map(p => ({
          ...p,
          id: p._id,
          image: normalizeImage(p.image),
          category: normalizeCategory(p.category),
        }));
        setProducts(mapped);
      } catch (err) {
        setError(err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);


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

  if (loading) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-red-600 text-xl">{error}</p>
        </div>
      </section>
    );
  }

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

