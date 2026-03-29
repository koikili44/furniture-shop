import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-wood-800 to-gold-600 text-white py-32 overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <img 
        src="/src/furniture pics/furniture hero.avif" 
        alt="Furniture Hero" 
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl">
          Premium Furniture
        </h1>
        <p className="text-xl md:text-2xl mb-12 drop-shadow-xl max-w-2xl mx-auto">
          Discover timeless pieces crafted with care. Elevate your space with our curated collection.
        </p>
        <Link
          to="/shop"
          className="bg-white text-wood-800 px-12 py-4 rounded-full text-lg font-semibold hover:bg-gold-400 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
        >
          Shop Collection
        </Link>
      </div>
    </section>
  );
};

export default Hero;

