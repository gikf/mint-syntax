import { useState } from 'react';
import { redirect } from 'react-router';

export const Register = () => {
  let [username, setUserName] = useState('user');
  let [password, setPassword] = useState('password');
  let [disableSubmit, setDisableSubmit] = useState(false);
  let [error, setError] = useState(null);

  const handleSubmit = async () => {
    setError(null);
    setDisableSubmit(true);
    try {
      let formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      const response = await fetch(
        import.meta.env.VITE_API_LOCATION + '/auth',
        {
          method: 'POST',
          body: formData,
        }
      );
      if (!response.ok) {
        throw response;
      }
      const data = await response.json();
      sessionStorage.setItem('access_token', data.access_token);
      console.log(data);
      console.log(sessionStorage.getItem('access_token'));
      redirect('/');
    } catch (e) {
      console.log('error');
      console.log(JSON.stringify(e));
      setError(e);
    }
    setDisableSubmit(false);
  };

  return (
    <>
      <div>Login</div>
      <form action={handleSubmit}>
        <label>
          Username{' '}
          <input
            type='text'
            id='username'
            placeholder='username'
            value={username}
            onChange={e => {
              setUserName(e.target.value);
            }}
          />
        </label>
        <label>
          Password{' '}
          <input
            type='password'
            id='password'
            placeholder='password'
            value={password}
            onChange={e => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <button type='submit' disabled={disableSubmit}>
          {disableSubmit ? '' : 'Login'}
        </button>
      </form>
      {error && <div>error: {JSON.stringify(error)}</div>}
    </>
  );
};

export default Register;
