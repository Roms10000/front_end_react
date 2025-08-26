export default function Modal1() {


    return(
<>
    <button data-modal-target="default-modal1" data-modal-toggle="default-modal1" className="block text-white bg-rose-200 hover:bg-rose-300 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer" type="button">
  Avis 2 
    </button>

    <div id="default-modal1" tabIndex="-1" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded- border-gray-200">
                    <div className="flex justify-center">
                    <h3 className="text-xl font-semibold text-gray-900">
                    Avis client entreprise "Cheval riz"
                    </h3>
                    </div>
                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center cursor-pointer" data-modal-hide="default-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <img src="/img/message2.PNG"   alt="message2" className="w-full h-auto max-h-[70vh] object-contain rounded-lg"/>
            </div>
        </div>
    </div>
</>
    )
}