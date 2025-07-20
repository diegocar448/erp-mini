// src/RegisterPage.tsx
import * as React from 'react';
import {
  Form,
  TextInput,
  PasswordInput,
  useNotify,
  useRedirect,
  Button,
} from 'react-admin';
import { Box } from '@mui/material';

export const RegisterPage = () => {
  const notify = useNotify();
  const redirect = useRedirect();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SIMPLE_REST_URL}/register`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        }
      );
      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || 'Registration failed');
      }
      const { user } = await res.json();
      //const { token, user } = await res.json();
      //localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      notify('Registration successful', { type: 'success' });
      redirect('/');
    } catch (err: any) {
      notify(err.message, { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      bgcolor="#0d0d23"
    >
      <Form onSubmit={handleSubmit}>
        <Box bgcolor="#222" p={4} borderRadius={2} width={300}>
          <h2 style={{ color: 'white', textAlign: 'center' }}>
            Register
          </h2>
          <TextInput
            source="fullName"
            label="Full Name"
            fullWidth
            helperText={false}
            required
          />
          <TextInput
            source="username"
            label="Username"
            fullWidth
            helperText={false}
            required
          />
          <PasswordInput
            source="password"
            label="Password"
            fullWidth
            helperText={false}
            required
          />
          <Box mt={2}>
            <Button
              type="submit"
              label="Create account"
              fullWidth
              disabled={loading}
            />
          </Box>
        </Box>
      </Form>
    </Box>
  );
};
