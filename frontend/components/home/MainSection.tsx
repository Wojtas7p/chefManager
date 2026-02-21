import "./../../app/globals.css"

export default function MainSection() {

         const benefits = [

    { title: "Panel zarządcy",
      desc: "Kompleksowe centrum dowodzenia Twoim biznesem. Intuicyjny interfejs pozwala na błyskawiczne dodawanie nowych pracowników, precyzyjne definiowanie ich ról oraz zarządzanie uprawnieniami dostępu. Monitoruj aktywność zespołu i optymalizuj strukturę organizacyjną w jednym miejscu, oszczędzając czas na formalnościach.", 
      img: "/photoLaptop.png" },
    { title: "Dostawy", 
        desc: "Pełna transparentność łańcucha dostaw i stanów magazynowych. System umożliwia szczegółową kontrolę przyjmowanego towaru, automatyczne śledzenie historii zmian oraz monitorowanie stanów w czasie rzeczywistym. Zapomnij o brakach w asortymencie i błędach w zamówieniach dzięki precyzyjnemu modułowi analitycznemu.", 
        img: "/photoDelivery.png" },
    { title: "Chat zespołu", 
        desc: "Błyskawiczna komunikacja to klucz do sprawnego serwisu. Zintegrowany komunikator pozwala na wymianę informacji między pracownikami w czasie rzeczywistym, eliminując chaos i nieporozumienia. Twórz grupy tematyczne, przesyłaj ważne komunikaty i dbaj o to, by każdy członek zespołu był zawsze na bieżąco z życiem lokalu.", 
        img: "/photoPhone.png" },

   ];

   const scrollingItems = [...benefits, ...benefits];


  return (
    <section id="mainSection" className="w-fullpx-10 flex items-center 
    justify-center min-h-screen  py-24"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center">
          Pełna kontrola nad lokalem
        </h2>

        <p className="text-center text-gray-800 mt-4">
          Jeden panel. Wszyscy pracownicy. Wszystkie dostawy.
        </p>

        <div className="grid gap-8 mt-16">
          {benefits.map((item, index) => (
      
           <div
      key={item.title}
      className={`flex items-center gap-10 p-8 rounded-xl shadow hover:shadow-lg transition 
        ${index === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} flex-col` }
    >
              <img src={item.img} alt={item.title} className="h-50 mx-auto max-[400px]:h-30" />

              <div>

                <h3 className="font-semibold text-xl">{item.title}</h3>
              <p className="w-100 mt-2 text-gray-800 max-[400px]:w-50">{item.desc}</p>
              </div>
              
            </div>
          ))}
        </div>
      </div>
       






       





    </section>
  );
}