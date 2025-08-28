export default function Footer() {

    return (
<nav className="border-gray-400 bg-gray-200 mt-50">
  <div className="max-w-screen h-48 flex items-center justify-between great-vibes-regular">
    <div className="flex flex-col ml-5">
    <p className="text-2xl underline">Adresse : </p>
    <p className="mt-3">32 rue des tulipes, 85092 , Fontenay-le-comte </p>
    </div>
    <div className="flex flex-col">
    <p className="text-2xl underline">En savoir plus sur l'entreprise:</p>
    <a href="https://fr.freepik.com/photos-gratuite/groupe-adolescents-uniforme-pom-pom-girl-mignon_18773966.htm#fromView=keyword&page=1&position=13&uuid=af47da89-0059-46fc-a955-fc5931400701&query=Esprit+Equipe+Pom+Pom+Girls" target="_blank"> Notre équipe</a>
    <p className="">Ville : Fontenay-le-comte  </p>
    <p className="flex gap-2">Pays : <img src="/img/french.svg" className="w-4"/></p>
    <a href="https://www.economie.gouv.fr/entreprises/innover-et-numeriser-son-entreprise/mentions-sur-votre-site-internet-les-obligations" target="_blank">Mentions légales  </a>
    <a href="https://www.economie.gouv.fr/politique-confidentialite" target="_blank">Politique de confidentialité  </a>
    </div>
    <p className="mr-5">Edited by Sivananda , Marion , Alban et Romain </p>
  </div>
</nav>
    )
}
