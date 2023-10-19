import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AddCharacter from './CreateCharacter'

const AllCharactersPage = () => {
  const [characters, setCharacters] = useState([])

  const fetchAllCharacters = async () => {
    try {
      const responseFromBackend = await fetch(`${import.meta.env.VITE_API_URL}/characters`)
      if (responseFromBackend.ok) {
        const parsed = await responseFromBackend.json()
        console.log(parsed)
        setCharacters(parsed.characters)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchAllCharacters()
  }, [])

  return (
    <>
      <h2>Characters List</h2>
      <ul>
        {characters.map(character => (
          <li key={character.id}>
            <Link to={`/characters/${character.id}`}> {character.name}</Link>
          </li>
        ))}
      </ul>
      <AddCharacter />
    </>
  )
}

export default AllCharactersPage
