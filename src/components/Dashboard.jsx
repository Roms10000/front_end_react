import Nav from "./Nav";
import Footer from "./Footer";
import { button } from "@material-tailwind/react";

export default function Dashboard () {


return(
<>
<Nav />
    <div>
        <span className=" border-b-1-black bg-white border border-gray-900 rounded-lg shadow-sm hover:bg-rose-200 ">
        <div className="flex ml-30 underline">
            <h5 className=" flex mb-2 text-2xl font-bold tracking-tight text-gray-900 group-hover:text-white great-vibes-regular">Suivie des demandes</h5>
            <svg xmlns="http://www.w3.org/2000/svg" width="128" height="45" viewBox="0 0 128 128">
            <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="96">🌸</text></svg>
    </div>
    <table class=" ml-35 mt-10 mb-120 w-400 border border-gray-900 text-sm text-gray-900">
        <thead class="bg-gray-200 text-gray-900">
        <tr>
            <th class="px-4 py-2 text-left">n° de demande</th>
            <th class="px-4 py-2 text-left">n° de devis</th>
            <th class="px-4 py-2 text-left">Statut du devis</th>
            <th class="px-4 py-2 text-left">Devis</th>
            <th class="px-4 py-2 text-left">Facture</th>
        </tr>
        </thead>
  <tbody>
    <tr class="border-t hover:bg-gray-50">
      <td class="px-4 py-2">--</td>
      <td class="px-4 py-2">--</td>
      <td class="px-4 py-2">--</td>
        <td class="px-4 py-2">
            <button type="button"  className="block text-white bg-rose-200 hover:bg-rose-300 focus:ring-4 focus:outline-none  font-medium rounded-lg text-xs px-3 py-1.5 text-center">VOIR</button>
        </td>
      <td class="px-4 py-2">--</td>
    </tr>
  </tbody>
</table>
        </span>
    </div>
<Footer/>
</>
    )
}

