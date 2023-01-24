import { useState } from 'react';
import './App.css';

const firstPainting = {
  name: "Mona Lisa",
  author: "Leonardo da Vinci",
  imgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/540px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg"
}

const startNewPaintingValue = {
  name: '',
  author: '',
  imgSrc: '',
}

function App() {
  const [newPaintingValue, setNewPaintingValue] = useState(startNewPaintingValue)
  // mums ir vajadzīgs gleznas steits lai kads liekam jaunu gleznu tā mainās
  const [paintings, setPaintings] = useState([firstPainting])

  return (
    <div className='art'>
      <form 
        className="art__form" 
        onSubmit={(eventObject) => {
          // aptur lapas pārlādi uz formas submita
          eventObject.preventDefault()

          // vecās vērtības un pielikt klāt jauno
          setPaintings([
            ...paintings,
            newPaintingValue
          ])

          setNewPaintingValue(startNewPaintingValue)



          console.log("Form Submit", newPaintingValue);
        }}
      >
        <h1>Art adding form</h1>

        <label className='art__label'>
          Art name <br />
          <input 
            type="text" 
            placeholder='Mona Lisa...' 
            className='art__input'
            value={newPaintingValue.name}
            // ik reizi, kad lietotājs kaut ko ieraksta nostrādās onChange
            onChange={(eventObject) => {
              // vērtība, kas tiek rakstīta glabājas:
              // eventObject.target.value
              
              // izeidojam jauno atjaunināto objektu, 
              const updatedNewPaintingValue = {
                ...newPaintingValue,
                name: eventObject.target.value
              }

              // veco state objektu aizstājam ar jauno, lai pārlūka redzētu atšķirību
              setNewPaintingValue(updatedNewPaintingValue)
            }}
            required="required"
          />
        </label>

        <label className='art__label'>
          Author <br />
          <input 
            type="text" 
            placeholder='Leonardo da Vinci...' 
            className='art__input'
            value={newPaintingValue.author}
            onChange={(eventObject) => {
              const updatedNewPaintingValue = {
                ...newPaintingValue,
                author: eventObject.target.value
              }

              setNewPaintingValue(updatedNewPaintingValue)
            }}
            required="required"
           />
        </label>

        <label className='art__label'>
          Painting Url <br />
          <input 
            type="text" 
            placeholder='https://paining.some...' 
            className='art__input'
            value={newPaintingValue.imgSrc}
            onChange={(eventObject) => {
              const updatedNewPaintingValue = {
                ...newPaintingValue,
                imgSrc: eventObject.target.value
              }

              setNewPaintingValue(updatedNewPaintingValue)
            }}
            required="required"
          />
        </label>

        <button className='art__button' type='submit'>
            Add painting
        </button>
      </form>

      <div className="art__paintings">
        {paintings.map((painting, index) => {

          return (
            <div key={Math.random()} className="art__painting">
              <img 
                src="http://cdn.onlinewebfonts.com/svg/img_129411.png" 
                alt="delete"
                className='art__painting-delete'
                onClick={() => {
                  const updatedPaintings = paintings.filter((_, i) => {
                    return index!== i; 
                  })

                  setPaintings(updatedPaintings)
                }}
               />
                <img 
                src={painting.imgSrc}
                alt=""
                className='art__painting-image'
                />
                <div className='art__painting-content'>
                  <span className='art__painting-name'>
                    {painting.name}
                  </span>
                  <span className='art__painting-author'>
                    {painting.author}
                  </span>
                </div>
            </div>
          )
        })}

        {paintings.length === 0 && <h1>No painting, please add some :(</h1>}
      </div>
    </div>
  );
}

// Array.map()

export default App;

// C - create - POST
// R - read - GET
// U - update - PUT
// D - delete - DELETE