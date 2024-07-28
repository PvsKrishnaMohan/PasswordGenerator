import { useCallback, useEffect, useState, useRef } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*()_+-={}:`';

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, setPassword]);

  return (
    <div className='mainDiv'>
      <h1 className='text-white text-center text-5xl my-6 text-cyan-500	'>Password Generator</h1>
      <div className='w-full max-w-2xl mx-auto shadow-md rounded-lg px-6 py-6 my-8 text-pink-600 bg-gray-700 card'>
        <h1 className='text-white text-center text-2xl my-5'>Generate a personalized strong password</h1>
        <div className='flex shadow rounded-lg overflow-hidden text-4xl mb-4'>
          <input
            type='text'
            value={password}
            className='outline-none w-full py-2 px-3 text-2xl'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-2 text-2xl bg-gradient-to-r from-blue-400 to-purple-500 hover:from-lime-500 hover:to-green-500'>
            Copy
          </button>
        </div>

        <div className='flex flex-col md:flex-row justify-between items-center gap-8 gap-y-4'>
          <div className='flex flex-col items-center gap-y-3 w-full'>
            <label className='text-2xl font-normal text-pink-500	'>Length : <span className='text-amber-300'>{length}</span> </label>
            <input
              type='range'
              min={5}
              max={30}
              value={length}
              className='cursor-pointer w-full range-input'
              onChange={(e) => { setLength(e.target.value) }}
            />
          </div>
          <div className='flex flex-col items-center w-full'>
            <div className='flex items-center gap-x-2 mb-2 w-full'>
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id='numberInput'
                className='w-6 h-6'
                onChange={() => { setNumberAllowed((prev) => !prev); }}
              />
              <label className='text-2xl font-medium' htmlFor='numberInput'>Numbers</label>
            </div>

            <div className='flex items-center gap-x-2 w-full'>
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id='characterInput'
                className='w-6 h-6'
                onChange={() => { setCharAllowed((prev) => !prev); }}
              />
              <label className='text-2xl font-medium' htmlFor='characterInput'>Characters</label>
            </div>
          </div>
        </div>
      </div>
      <footer className='text-center py-4 w-full mt-auto text-white'>
        <p className='text-sm sm:text-base'>
          © 2024 Password Generator by Krishna Mohan P.V.S
        </p>
      </footer>
    </div>
  );
}

export default App;
