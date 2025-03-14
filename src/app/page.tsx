"use client";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  font-size: 24px;
`;

export default function Home() {
  return <Container>Welcome to Lead Management</Container>;
}
