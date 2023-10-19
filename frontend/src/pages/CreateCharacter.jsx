import { useState } from "react";
function AddCharacter() {
    const [name, setName] = useState("");
    const [ocupation, setOcupation] = useState("");
    const [debt, setDebt] = useState(false);
    const [weapon, setWeapon] = useState("");

    const onSubmit = async event => {
        event.preventDefault()
        const payload = {
            name,
            occupation: ocupation,
            debt,
            weapon,
        }
        try {
            const response = await fetch(
                `http://localhost:5005/api/characters/`,
                {
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers: {
                        'Content-type': 'application/json',
                    },
                }
            )
            console.log(response)
            if (response.ok) {
                const currentCharacter = await response.json()
                console.log(currentCharacter)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <label>
                    Name
                    <input type="text" name="name" onChange={event => setName(event.target.value)} value={name} />
                </label>
                <label>
                    Ocupation
                    <input type="text" name="ocupation" onChange={event => setOcupation(event.target.value)} value={ocupation} />
                </label>
                <label>
                    Debt
                    <input type='checkbox' name="debt" onChange={() => setDebt(!debt)} checked={debt} />
                </label>
                <label>
                    Weapon
                    <input type='text' name="weapon" onChange={event => setWeapon(event.target.value)} value={weapon} />
                </label>
                <button type='submit'>Add Character</button>
            </form>
        </>
    )
}

export default AddCharacter;