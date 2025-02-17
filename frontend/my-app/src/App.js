import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState(null);
  const openapikey = process.env.OPENAI_API_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://127.0.0.1:7860/gradio_api/call/lambda', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [
            userInput,
            openapikey,
            "gpt-3.5-turbo",
            true
          ]
        }),
      });
      
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter your command..."
            style={{
              padding: '10px',
              marginBottom: '10px',
              width: '300px',
              fontSize: '16px'
            }}
          />
          <button 
            type="submit"
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            Submit
          </button>
        </form>
        
        {response && (
          <div style={{ marginTop: '20px' }}>
            <h3>Response:</h3>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
