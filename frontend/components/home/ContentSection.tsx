import "./../../app/globals.css"

export default function ContentSection() {
    
     const benefits = [
    { title: "Zarządzanie czasem", img: "/photoHome1.png" },
    { title: "Kontrola towaru", img: "/photoHome2.png" },
    { title: "Logistyka dostaw", img: "/photoHome3.png" },
    { title: "Precyzja", img: "/photoHome4.jpg" },
    { title: "Spokój", img: "/photoHome5.png" },
    { title: "Atmosfera", img: "/photoHome6.png" },
   ];

   const scrollingItems = [...benefits, ...benefits];

  return (
    <section id="contentSection" 
    className="w-full flex items-center justify-center min-h-screen py-24 overflow-hidden flex-col"
    >
      <h2 className="text-4xl font-bold text-center">Dlaczego FlowGastro?</h2>
      <p className="mt-4 text-center text-gray-900 max-w-2xl mx-auto">
        Zautomatyzuj obsługę lokalu, zyskaj pełną kontrolę nad 
        zespołem oraz dostawami <br/> wszystko w jednym, intuicyjnym panelu.
      </p>

      <div className="mt-16 w-full overflow-hidden">
        {/* POPRAWIONO: Dodano 'f' do 'flex' oraz 'flex-row' */}
        <div
          className="flex flex-row gap-4 animate-marquee hover:[animation-play-state:paused] w-max"
          style={{ 
            animation: 'marquee 50s linear infinite' // Wymuszenie animacji inline, jeśli globals.css nie łapie
          }}
        >
          {scrollingItems.map((benefit, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 w-64 sm:w-80 md:w-80 h-96 rounded-xl overflow-hidden"
            >
              <div className="w-full h-full absolute bg-black/20 z-10"></div>
              <img src={benefit.img} className="w-full h-full object-cover" alt={benefit.title} />
              <h3 className="absolute bottom-4 left-4 text-white font-bold text-xl p-2 rounded z-20">
                {benefit.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* KLUCZOWE: Jeśli nie masz tego w globals.css, wstaw ten styl tutaj */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 50s linear infinite;
        }
      `}</style>
    </section>
  );
}