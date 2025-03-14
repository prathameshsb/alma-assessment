"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const Container = styled.div`
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  width: 100%;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 20px;
`;

const Button = styled.button`
  padding: 10px;
  width: 100%;
  background: black;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 20px;

  &:hover {
    background: #333;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
`;

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const result = await signIn("credentials", {
      username: credentials.username,
      password: credentials.password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid username or password");
    } else {
      router.push("/admin"); // Redirect to admin panel on success
    }
  };

  return (
    <Container>
      <Title>Admin Login</Title>
      <Input
        type="text"
        placeholder="Username"
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
      />
      <Input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      {error && <ErrorText>{error}</ErrorText>}
      <Button onClick={handleLogin}>Login</Button>
    </Container>
  );
}
