import Header from "./Header";
import Hero from "./Hero";
import Footer from "./Footer";
import SupportedLanguages from "./SupportedLanguages";

function HomePage() {
  return (
    <div className="bg-gradient-to-tr from-zinc-900 to-slate-900 text-gray-200">
      <Header />
      <Hero />
      <SupportedLanguages />
      <Footer />
    </div>
  );
}

export default HomePage;
