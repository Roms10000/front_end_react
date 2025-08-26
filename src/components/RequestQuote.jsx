import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import Nav from "./Nav";

export default function RequestQuote() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const adaptCategories = (data) => {
    console.log("Data reçue dans adaptCategories :", data);
    return data.map((cat) => ({
      id: cat.id,
      nom: cat.nom
    }))
  }


  const navigate = useNavigate();

  useEffect(() => {
    // const fetchUser = async () => {
    //   try {
    //     const res = await fetch("http://localhost:8000/api/me", {
    //       headers: {
    //         "Authorization": "Bearer " + localStorage.getItem("token"),
    //       },
    //     });
    //     if (!res.ok) throw new Error("Impossible de récupérer l'utilisateur");
    //     const data = await res.json();
    //     setUserId(data.id); // ou data.user_id selon ton API
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/categories");
        if (!res.ok) throw new Error("Erreur fetch catégories");
        const data = await res.json();
        
        console.log(data.member);
        setCategories(adaptCategories(data.member));
      } catch (error) {
        console.error(error);
      }
    };

    // fetchUser();
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("id");
    console.log(userId);

    try {
      const res = await fetch("http://localhost:8000/api/demandes", {
        method: "POST",
        headers: { 
          "accept": "application/ld+json",
          "Content-Type": "application/ld+json" 
        },
        body: JSON.stringify({
          nom,
          prenom,
          description,
          category: `/api/categories/${category}`,
          user: `/api/users/${userId}`,
        }),
      });

      if (!res.ok) throw new Error("Erreur serveur");

      const data = await res.json();
      console.log("Réponse API:", data);

      navigate("/");
    } catch (error) {
      console.error("Erreur fetch:", error);
      alert("Impossible de créer la demande !");
    }
  };
    return (
    <>
      <Nav />
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <Link to="/">
          <img
            alt="Your Company"
            src="/img/ordi.webp"
            className="mx-auto h-10 w-auto"
          />
          </Link>
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Faire une demande
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form method="POST" onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="nom" className="block text-sm/6 font-medium text-gray-900">
                Nom
              </label>
              <div className="mt-2">
                <input
                  id="nom"
                  name="nom"
                  type="text"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-rose-200 sm:text-sm/6"  value={nom} onChange={(e)=> setNom(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="prenom" className="block text-sm/6 font-medium text-gray-900">
                Prénom
              </label>
              <div className="mt-2">
                <input
                  id="prenom"
                  name="prénom"
                  type="text"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300  focus:outline-2 focus:-outline-offset-2 focus:outline-rose-200 sm:text-sm/6"  value={prenom} onChange={(e)=> setPrenom(e.target.value)}
                />
              </div>
            </div>
                        <div>
              <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  type="textarea"
                  required
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300  focus:outline-2 focus:-outline-offset-2 focus:outline-rose-200 sm:text-sm/6"  value={description} onChange={(e)=> setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="category" className="block text-sm/6 font-medium text-gray-900">
                  Catégorie
                </label>
              </div>
              <div className="mt-2">
                <select name="category" id="category" value={category} onChange={(e)=> setCategory(e.target.value)}>
                  <option value="">Toutes les catégories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nom}
                    </option>
                  ))}
                </select>
                
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-rose-200 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-rose-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-300 cursor-pointer"
              >
                Envoyer la demande
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}