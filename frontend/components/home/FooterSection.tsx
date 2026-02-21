import "./../../app/globals.css"

export default function FooterSection() {
  return (
    <section className="bg-gray-900 text-gray-300 h-screen py-20" >


        <div className="max-w-6xl mx-auto px-10 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          <div>
            <span className="text-[#2E8A80] font-bold tracking-widest uppercase text-sm">
              Wkrótce w FlowGastro
            </span>
            <h2 className="text-4xl font-bold text-white mt-4 mb-6">
              Nieustannie się rozwijamy
            </h2>
            <p className="text-lg text-gray-400 mb-8">
              Pracujemy nad funkcjami, które całkowicie odmienią Twój dzień pracy. 
              Zarządzaj lokalem tak, jak lubisz – z biura, z domu lub... głosem.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* FUNKCJA 1 */}
              <div className="flex items-center gap-3 bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                <span className="text-2xl">📱</span>
                <span className="font-medium text-white">Aplikacja Mobilna</span>
              </div>
              {/* FUNKCJA 2 */}
              <div className="flex items-center gap-3 bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                <span className="text-2xl">💻</span>
                <span className="font-medium text-white">Wersja Desktop</span>
              </div>
              {/* FUNKCJA 3 */}
              <div className="flex items-center gap-3 bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                <span className="text-2xl">🎙️</span>
                <span className="font-medium text-white">Zamówienia Głosowe</span>
              </div>
              {/* FUNKCJA 4 */}
              <div className="flex items-center gap-3 bg-gray-800/50 p-4 rounded-xl border border-gray-700">
                <span className="text-2xl">🔗</span>
                <span className="font-medium text-white">Integracje POS</span>
              </div>
            </div>
          </div>


          {/* DEKORACYJNY ELEMENT WIZUALNY */}
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/10 blur-3xl rounded-full"></div>
            <div className="relative bg-gray-800 p-8 rounded-3xl border border-gray-700 shadow-2xl">
              <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                <span className="animate-pulse w-3 h-3 bg-[#2E8A80] rounded-full"></span>
                Status prac: 85%
              </h4>
              <div className="space-y-4">
                <div className="h-2 w-full bg-gray-400 rounded-full overflow-hidden">
                  <div className="h-full bg-[#2E8A80] w-[85%]"></div>
                </div>
                <p className="text-sm text-gray-400">
                  Wdrażamy ostatnie poprawki do modułu rozpoznawania głosu. 
                  Premiera nowej wersji już wkrótce!
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>



    <hr className="border-gray-800" />

    <footer className="max-w-6xl mx-auto bg-gray-900">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 py-4 px-10 ">
          <div>
            <h4 className="text-2xl font-bold  text-[#2E8A80]">FlowGastro</h4>
          
          </div>
          
            <div className="flex gap-10 text-sm">
              <a href="#" className="hover:text-white transition-colors">Start</a>
              <a href="#" className="hover:text-white transition-colors">O nas</a>
              <a href="#" className="hover:text-white transition-colors">Kontakt</a>
            </div>
          </div>
          <div id="footerSection" 
          className="w-full p-4 text-sm  text-gray-300 px-10
          border-t border-gray-800 text-center text-sm text-gray-600
          ">
          <p>© 2026 FlowGastro. Wszelkie prawa zastrzeżone.</p>
        </div>
      </footer>
    </section>
   
  );
}