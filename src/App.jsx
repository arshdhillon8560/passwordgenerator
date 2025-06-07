import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumbAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  
  //useRef
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*?/.,;+-_';

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard =useCallback(()=>{  passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,3);
     window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-lg rounded-2xl px-6 py-6 my-8 text-orange-400 bg-gradient-to-r from-gray-700 to-gray-900">
        <h1 className="text-white text-center text-2xl font-semibold mb-4">Password Generator</h1>

        {/* Password Display and Copy */}
        <div className="flex shadow-inner rounded-lg overflow-hidden mb-6 border border-gray-600">
          <input
            type="text"
            value={password}
            className="bg-transparent text-white outline-none w-full py-2 px-4 overflow-x-auto whitespace-nowrap text-ellipsis"
            placeholder="Generated password"
            readOnly ref={passwordRef}
          />
          <button
           onClick={copyPasswordToClipboard}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 transition duration-200 ease-in-out"
          
          >
            Copy
          </button>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row text-sm gap-y-4 sm:gap-x-4 text-white">
          {/* Length Slider */}
          <div className="flex items-center justify-between gap-4 w-full">
            <label className="font-medium min-w-max">Length: {length}</label>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer accent-orange-400 flex-1"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
          </div>

          {/* Number Checkbox */}
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              onChange={() => {
                setNumbAllowed((prev) => !prev);
              }}
              className="accent-orange-400 w-5 h-5"
            />
            <label htmlFor="numberInput" className="font-medium">Number</label>
          </div>

          {/* Special Character Checkbox */}
          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
              className="accent-orange-400 w-5 h-5"
            />
            <label htmlFor="characterInput" className="font-medium">Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
