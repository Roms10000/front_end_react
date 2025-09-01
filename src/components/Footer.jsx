export default function Footer() {

    return (
<nav className="border-gray-400 bg-gray-200 mt-50">
  <div className="max-w-screen pt-8 flex max-425:flex-col max-425:items-center max-425:text-center  justify-between great-vibes-regular px-4">
    <div className="flex flex-col mb-6">
    <p className="text-xl underline">Adresse : </p>
    <p className="mt-3">32 rue des tulipes <br /> 85092 Fontenay-le-comte </p>
    </div>
    <div className="flex flex-col items-center text-center mb-6">
    <p className="text-xl underline mb-3">A propos :</p>
    <a href="https://fr.freepik.com/photos-gratuite/groupe-adolescents-uniforme-pom-pom-girl-mignon_18773966.htm#fromView=keyword&page=1&position=13&uuid=af47da89-0059-46fc-a955-fc5931400701&query=Esprit+Equipe+Pom+Pom+Girls" target="_blank"> Notre équipe</a>
    <div className="flex gap-2"><span>Pays : </span><img src="/img/french.svg" className="w-4"/></div>
    <a href="https://www.economie.gouv.fr/entreprises/innover-et-numeriser-son-entreprise/mentions-sur-votre-site-internet-les-obligations" target="_blank">Mentions légales  </a>
    <a href="https://www.economie.gouv.fr/politique-confidentialite" target="_blank">Politique de confidentialité  </a>
    </div>
    <div className="flex flex-col mb-6">    
    <p className="text-xl underline">Editeurs :</p>
    <p className="mt-3">- Sivananda <br /> - Marion <br /> - Alban <br /> - Romain </p>
    </div>

  </div>
</nav>
    )
}
