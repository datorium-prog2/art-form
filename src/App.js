import './App.css';

function App() {
  
  return (
    <div className='art'>
      <form className="art__form">
        <h1>Art adding form</h1>

        <label className='art__label'>
          Art name <br />
          <input type="text" placeholder='Mona Lisa...' className='art__input' />
        </label>

        <label className='art__label'>
          Author <br />
          <input type="text" placeholder='Leonardo da Vinci...' className='art__input' />
        </label>

        <label className='art__label'>
          Painting Url <br />
          <input type="text" placeholder='https://paining.some...' className='art__input' />
        </label>

        <button className='art__button' type='submit'>
            Add painting
        </button>
      </form>
      <div className="art__paintings">
        <div className="art__painting">
          <img 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/540px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg"
           alt=""
           className='art__painting-image'
           />
          <span className='art__painting-name'>Mona Lisa</span>
          <span className='art__painting-author'>Leonardo da Vinci</span>
        </div>
      </div>
    </div>
  );
}


export default App;