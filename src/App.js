import { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";

export default function App() {
  const [characters, setCharacters] = useState([]);
  const [charactersBackup, setCharactersBackup] = useState([]);
  const [search, setSearch] = useState("");
  console.log(search);

  useEffect(() => {
    axios
      .get("https://rickandmortyapi.com/api/character/")
      .then((res) => {
        setCharacters(res.data.results);
        setCharactersBackup(res.data.results);
        console.log(res.data.results);
      })
      .catch((error) => {
        console.error("Erro ao fazer a solicitação:", error);
      });
  }, []);

  const onSearch = (e) => {
    const searchLowerCase = e.target.value.toLowerCase();
    setSearch(searchLowerCase);

    const filteredCharacters = characters.filter((character) =>
      character.name.toLowerCase().includes(searchLowerCase)
    );
    setCharacters(filteredCharacters);
  };

  const resetSearch = () => {
    setSearch("");
    setCharacters(charactersBackup);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <span>Ricky and Morty</span>
        <div>
          <input onChange={onSearch} value={search}></input>
          <button onClick={resetSearch}>x</button>
        </div>
      </nav>
      {characters.map((character) => (
        <div className="character-container">
          <img src={character.image} />
          <p>{character.name}</p>
        </div>
      ))}
    </div>
  );
}
