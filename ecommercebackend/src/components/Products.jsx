      




import { useState, useMemo } from 'react';
import ProductCard from './ProductCard';

// ✅ Imports (all renamed with hyphens)
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

// ✅ Full product catalog
const productsData = [
  { id: 1, name: "Big Book Shelf", category: "Shelves", price: 299.99, image: bigBookShelfImg },
  { id: 2, name: "Big Sitting Room Sofa", category: "Sofas", price: 899.99, image: bigSittingRoomSofaImg },
  { id: 3, name: "Book Shelf", category: "Shelves", price: 199.99, image: bookShelfImg },
  { id: 4, name: "Chair Sofa", category: "Chairs", price: 449.99, image: chairSofaImg },
  { id: 5, name: "Chair", category: "Chairs", price: 149.99, image: chairImg },
  { id: 6, name: "City Sofa", category: "Sofas", price: 699.99, image: citySofaImg },
  { id: 7, name: "Clear Dining", category: "Dining", price: 599.99, image: clearDiningImg },
  { id: 8, name: "Dark Sofa", category: "Sofas", price: 749.99, image: darkSofaImg },
  { id: 9, name: "Dining 4", category: "Dining", price: 699.99, image: dining4Img },
  { id: 10, name: "Dining 2", category: "Dining", price: 499.99, image: dining2Img },
  { id: 11, name: "Dining", category: "Dining", price: 599.99, image: diningImg },
  { id: 12, name: "Full Dining", category: "Dining", price: 1199.99, image: fullDiningImg },
  { id: 13, name: "Full Sofa", category: "Sofas", price: 999.99, image: fullSofaImg },
  { id: 14, name: "Furniture Hero", category: "Sofas", price: 899.99, image: furnitureHeroImg },
  { id: 15, name: "Furniture Sofa", category: "Sofas", price: 799.99, image: furnitureSofaImg },
  { id: 16, name: "Jona Sofa", category: "Sofas", price: 849.99, image: jonaSofaImg },
  { id: 17, name: "Kitchen Cabinet and Dining", category: "Dining", price: 1399.99, image: kitchenCabinetDiningImg },
  { id: 18, name: "Living Room Sofa", category: "Sofas", price: 899.99, image: livingRoomSofaImg },
  { id: 19, name: "Multi Sofa", category: "Sofas", price: 999.99, image: multiSofaImg },
  { id: 20, name: "Office Chair", category: "Office", price: 199.99, image: officeChairImg },
  { id: 21, name: "Office Lounge", category: "Office", price: 699.99, image: officeLoungeImg },
  { id: 22, name: "Office Shelf", category: "Office", price: 399.99, image: officeShelfImg },
  { id: 23, name: "Office Table", category: "Office", price: 499.99, image: officeTableImg },
  { id: 24, name: "Office Work 3", category: "Office", price: 799.99, image: officeWork3Img },
  { id: 25, name: "Office Workstation", category: "Office", price: 999.99, image: officeWorkstationImg },
  { id: 26, name: "Palour Sofa", category: "Sofas", price: 699.99, image: palourSofaImg },
  { id: 27, name: "Round Dining", category: "Dining", price: 699.99, image: roundDiningImg },
  { id: 28, name: "Shelf Simple", category: "Shelves", price: 249.99, image: shelfSimpleImg },
  { id: 29, name: "Shelf", category: "Shelves", price: 199.99, image: shelfImg },
  { id: 30, name: "Simple Dining", category: "Dining", price: 499.99, image: simpleDiningImg },
  { id: 31, name: "Small Workstation", category: "Office", price: 599.99, image: smallWorkstationImg },
  { id: 32, name: "Sofa Again", category: "Sofas", price: 799.99, image: sofaAgainImg },
  { id: 33, name: "Sofa Gr", category: "Sofas", price: 749.99, image: sofaGrImg },
  { id: 34, name: "Sofa Main", category: "Sofas", price: 899.99, image: sofaMainImg },
  { id: 35, name: "Sofa Set", category: "Sofas", price: 999.99, image: sofaSetImg },
  { id: 36, name: "Sven Sofa", category: "Sofas", price: 849.99, image: svenSofaImg },
  { id: 37, name: "TV Console", category: "Console", price: 384.99, image: tvConsoleImg },
  { id: 38, name: "Yellow Sofa", category: "Sofas", price: 926.99, image: yellowSofaImg }

  
];



  
    
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
