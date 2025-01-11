import { FaJsSquare, FaJava, FaPython } from "react-icons/fa";
import { SiCplusplus } from "react-icons/si";

function SupportedLanguages() {
  const languages = [
    { name: "JavaScript", icon: FaJsSquare },
    { name: "Java", icon: FaJava },
    { name: "Python", icon: FaPython },
    { name: "C++", icon: SiCplusplus },
  ];

  return (
    <section className="mb-16">
      <div className="mx-auto w-10/12 max-w-[1200px] px-12">
        <h2 className="mb-12 text-center text-3xl font-bold hover:text-purple-900">
          Supported Languages
        </h2>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {languages.map((lang) => (
            <div key={lang.name} className="flex flex-col items-center">
              <lang.icon className="mb-4 text-6xl text-slate-700 hover:text-purple-900" />
              <span className="text-xl font-semibold">{lang.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SupportedLanguages;
