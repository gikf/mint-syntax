import { useEffect, useState } from 'react';
import { NavLink } from 'react-router';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          import.meta.env.VITE_API_LOCATION + '/me',
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
            },
          }
        );
        setLoading(false);
        if (!response.ok) {
          setError(true);
          return;
        }
        const data = await response.json();
        console.log(data);
        setData(JSON.stringify(data));
      } catch (e) {
        console.log('error', e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='card'>
      <NavLink to='/register'>Register</NavLink>
      <NavLink to='/login'>Login</NavLink>
      <button
        class='animated-button'
        onClick={() => setCount(count => count + 1)}
      >
        count is {count}
      </button>
      {loading && 'loading...'}
      {error && 'error!'}
      {data ? data : ''}
    </div>
  );
}

export default App;
