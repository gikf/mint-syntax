import { useRef } from 'react';
import { redirect } from 'react-router';
import { useForm } from 'react-hook-form';

export const Register = () => {
  const formRef = useRef();
  let {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      username: 'user',
      password: 'password',
      name: 'name',
    },
  });

  const onSubmit = async data => {
    console.log('onSubmit');
    if (!isValid) {
      console.log('form not valid');
      return;
    }
    try {
      console.log('submitting');
      console.log(data);
      const formData = new FormData(formRef.current);

      const response = await fetch(
        import.meta.env.VITE_API_LOCATION + '/users/',
        {
          method: 'POST',
          body: formData,
        }
      );
      if (!response.ok) {
        throw response.statusText;
      }
      console.log(await response.json());
      redirect('/login');
    } catch (e) {
      console.log('error');
      console.log(JSON.stringify(e));
    }
  };

  return (
    <>
      <div>Register</div>
      <div>
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
          <label>
            Username{' '}
            <input {...register('username', { required: 'Enter username' })} />
            {errors?.username && (
              <span style={{ color: 'red' }}>{errors?.username?.message}</span>
            )}
          </label>
          <label>
            Password{' '}
            <input
              type='password'
              {...register('password', { required: 'Enter password' })}
            />
          </label>
          {errors?.password && (
            <span style={{ color: 'red' }}>{errors?.password?.message}</span>
          )}
          <label>
            Name{' '}
            <input {...register('name', { required: 'Name is required' })} />
          </label>
          {errors?.name && (
            <span style={{ color: 'red' }}>{errors?.name?.message}</span>
          )}
          <button type='submit' disabled={!(!isSubmitting && isValid)}>
            {!isSubmitting && isValid ? 'Register' : '...'}
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
