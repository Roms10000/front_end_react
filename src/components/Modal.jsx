import React, {useState} from "react";

export default function Modal() {

const [isOpen, setIsOpen] = useState(false);
    return(
<>
<button
  onClick={() => setIsOpen(true)}
  className="rounded-md border-2 border-amber-50 w-[100px] h-[50px] relative group overflow-hidden 
             transition-transform duration-300 ease-out hover:scale-110 cursor-pointer"
>
  <div className="bg-rose-300 text-[var(--color-bordeau)] w-full h-full flex flex-col justify-center">
    Cheval Riz
  </div>
  <div className="transition-transform ease-out bg-gray-400 opacity-40 absolute w-[20px] h-[60px] 
                  -top-2 -skew-x-12 -translate-x-8 group-hover:translate-x-28">&nbsp;</div>
</button>  
{isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => setIsOpen(false)} // Ferme si on clique en dehors
        >
          <div
            className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()} // Empêche la fermeture si on clique dans la modale
          >
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                    <div className="flex justify-center">
                    <h3 className="text-xl font-semibold text-gray-900">
                    entreprise "Cheval Riz"
                    </h3>
                    </div>
                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center cursor-pointer" onClick={() => setIsOpen(false)}>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <img src="/img/message.PNG"   alt="message" className="w-full h-auto max-h-[70vh] object-contain rounded-lg"/>
            </div>
        </div>
    )}
</>
    )
}