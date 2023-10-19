const router = require("express").Router();

/* GET home page */
router.get("/", async (req, res) => {
  try {
    const responseFromAPI = await fetch(
      "https://ih-crud-api.herokuapp.com/characters"
    );
    if (responseFromAPI.ok) {
      const charactersFromAPI = await responseFromAPI.json();
      res.json({ characters: charactersFromAPI });
    }
  } catch (error) {
    console.error(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const responseFromAPI = await fetch(
      `https://ih-crud-api.herokuapp.com/characters/${req.params.id}`
    );
    if (responseFromAPI.ok) {
      const characterFromAPI = await responseFromAPI.json();
      res.json({ character: characterFromAPI });
    }
  } catch (error) {
    console.error(error);
  }
});

// Create
router.post("/", async (req, res) => {
  const charData = req.body
  console.log(charData)
  /* const {name, occupation, weapon, debt} = req.body */
  try {
    const apiResponse = await fetch(
      `https://ih-crud-api.herokuapp.com/characters/`,
      {
        method: "POST",
        body: JSON.stringify(charData),
        headers: { "Content-type": "application/json" },
      }
    );
    
    if (apiResponse.ok) {
      const newCharacter = await apiResponse.json();
      console.log(newCharacter)
      res.status(200).json({ character: newCharacter });
    } else {
      res.status(400).json({message:"There was an error on your request"})
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({error})
  }
});

// Update
// router.put("/:id", async (req, res, next) => {
//   const { id } = req.params;
  
//   try {
//     const apiResponse = await fetch(
//       `https://ih-crud-api.herokuapp.com/characters/${id}`,
//       {
//         method: "PUT",
//         body: JSON.stringify(req),
//         headers: { "Content-type": "application/json" },
//       }
//     );
//     if (res.ok) {
//       const updatedCharacter = await apiResponse.json();
//       res.status(200).json({ character: updatedCharacter });
//     }
//   } catch (error) {
//     console.error(error);
//   }
// });
//
// Delete
// router.delete('/:id', async (req, res) => {
//   const {id} = request.params
//   try {
//     await Character.findByIdAndDelete(id)
//     res.status(202).json({message: "Character deleted"})
//   } catch (error) {
//     console.log(error)
//     response.status(400).json({error})
//   }
// })

module.exports = router;

// https://ih-crud-api.herokuapp.com/characters
