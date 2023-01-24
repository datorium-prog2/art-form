import { useState, useEffect } from 'react';
import './App.css';

// Sākuma vērtība formas inputiem
const newPaintingStartValue = {
  name: '',
  author: '',
  imgSrc: '',
}

function App() {
  // Formas inputu steits, lai varētu redzēt izmaiņas mūsu pārlūkā
  const [newPaintingValue, setNewPaintingValue] = useState(newPaintingStartValue)
  // mums ir vajadzīgs gleznas steits lai kads liekam jaunu gleznu tā mainās
  const [paintings, setPaintings] = useState([])

  // funkcija, kas no DB paņem visus paintingus
  const getAllPaintings = () => {
    // ar fetch mēs prasam API pieprasījumus uz serveri
    fetch('http://localhost:3004/paintings')
    .then((response) => response.json())
    .then((allPaintings) => {
      // kad esam paintingus dabūjuši, liekam steitā lai vizuāli tos redzētu browserī
      setPaintings(allPaintings)
    })
  }

  useEffect(() => {
    // šī funkcija izsauksies vienu reizi uz komponenta ielādi, kas paņem visas gleznas
    getAllPaintings()
  }, [])

  return (
    <div className='art'>
      <form 
        className="art__form" 
        onSubmit={(eventObject) => {
          // aptur lapas pārlādi uz formas submita
          eventObject.preventDefault()

          // sakam serverim, ka gribam saglabāt jaunu paitningu
          fetch('http://localhost:3004/paintings', { 
            // POST - pieprasījuma veids lai izveidotu
            method: 'POST',
             // sakam serverim, ka sūtīsim JSON
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            // dati par mākslas darbu, jāliek JSON.stringify, jo to prasa fetch metode
            body: JSON.stringify(newPaintingValue)
          })
          .then((response) => response.json())
          .then((addedPainting) => {
            // pie vienojam visām gleznām jauno gleznu
            setPaintings([
              ...paintings,
              addedPainting
            ])
          })

          // resetojam inputa vērtības uz tukšumu
          setNewPaintingValue(newPaintingStartValue)
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
                  // sakam serverim, ka gribam dzēs gleznu ar konkrētu ID
                  fetch(`http://localhost:3004/paintings/${painting.id}`, {method: "DELETE"})
                  .then((response) => response.json())
                  .then((deletedPainting) => {
                    // izņemam gleznu no gleznu masīva
                    const updatedPainting = paintings.filter((currentPainting) => {
                        return currentPainting.id !== painting.id
                    })

                    console.log('updatedPainting', updatedPainting);
                    // saglabājam atjaunināto gleznu masīvu steitā, lai to redzētu browserī
                    setPaintings(updatedPainting)
                  })
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
        
        {/* ja nav gleznas tad to arī parādam */}
        {paintings.length === 0 && <h1>No painting, please add some :(</h1>}
      </div>
    </div>
  );
}

export default App;
