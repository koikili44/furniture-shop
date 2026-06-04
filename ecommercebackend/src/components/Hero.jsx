// import { Link } from 'react-router-dom';

// const Hero = () => {
//   return (
//     <section className="relative bg-gradient-to-r from-wood-800 to-gold-600 text-white py-32 overflow-hidden">
//       <div className="absolute inset-0 bg-black/20"></div>
//       <img 
//         src="/src/furniture pics/furniture hero.avif" 
//         alt="Furniture Hero" 
//         className="absolute inset-0 w-full h-full object-cover opacity-50"
//       />
//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//         <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl">
//           Radison Furnitures
//         </h1>
//         <p className="text-xl md:text-2xl mb-12 drop-shadow-xl max-w-2xl mx-auto">
//           Discover timeless pieces crafted with care. Elevate your space with our curated collection.
//         </p>
//         <Link
//           to="/shop"
//           className="bg-white text-blue-950 px-12 py-4 rounded-full text-lg font-semibold hover:bg-gold-400 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:-translate-y-1"
//         >
//           Shop Collection
//         </Link>
//       </div>
//     </section>
//   );
// };

// export default Hero;



import { Link } from 'react-router-dom';
import heroImage from '../assets/furniture-hero.avif';

const Hero = () => {
  return (
    <section className="relative h-screen text-white overflow-hidden">
      {/* Background Image */}
      <img
        src={heroImage}
        alt="Furniture Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl">
          Radison Furnitures
        </h1>

        <p className="text-xl md:text-2xl mb-12 drop-shadow-xl max-w-2xl mx-auto">
          Discover timeless pieces crafted with care. Elevate your space with our curated collection.
        </p>

        <Link
          to="/shop"
          className="bg-white text-blue-950 px-12 py-4 rounded-full text-lg font-semibold hover:bg-amber-400 transition-all duration-300 shadow-2xl transform hover:-translate-y-1"
        >
          Shop Collection
        </Link>
      </div>
    </section>
  );
};

export default Hero;

