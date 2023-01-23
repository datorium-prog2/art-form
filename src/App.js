import { useState } from 'react';
import './App.css';

const painting = {
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

  return (
    <div className='art'>
      <form className="art__form">
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
          />
        </label>

        <label className='art__label'>
          Author <br />
          <input 
            type="text" 
            placeholder='Leonardo da Vinci...' 
            className='art__input'
           />
        </label>

        <label className='art__label'>
          Painting Url <br />
          <input 
            type="text" 
            placeholder='https://paining.some...' 
            className='art__input'
          />
        </label>

        <button className='art__button' type='submit'>
            Add painting
        </button>
      </form>

      <div className="art__paintings">
        <div className="art__painting">
          <img 
           src={painting.imgSrc}
           alt=""
           className='art__painting-image'
           />
          <span className='art__painting-name'>
            {painting.name}
          </span>
          <span className='art__painting-author'>
            {painting.author}
          </span>
        </div>
      </div>
    </div>
  );
}


export default App;