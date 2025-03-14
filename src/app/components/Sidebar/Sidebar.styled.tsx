import styled from "styled-components";
import Link from "next/link";

export const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  transition: transform 0.3s ease-in-out;
  border: 1px solid #ccc;

  @media (max-width: 768px) {
    width: 100%;
    height: 60px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    transform: translateY(-100%)
  }

`;

export const ToggleButton = styled.button`
  display: none;
  background: none;
  font-size: 24px;
  border: none;
  cursor: pointer;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    display: block;
  }
`;

export const NavItem = styled(Link)`
  padding: 15px;
  text-decoration: none;
  font-size: 18px;
  border-radius: 5px;
  transition: background 0.2s;
  display: block;
`;

export const UserProfile = styled.div`
  margin-top: auto;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px;
  border-radius: 5px;
  position: relative;
`;

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
`;

export const LogoutPopup = styled.div`
  position: absolute;
  bottom: 75px;
  left: 50px;
  width: 120px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  padding: 10px;
  text-align: center;
  display: block;
  z-index: 10;
`;

export const LogoutButton = styled.button`
  width: 100%;
  padding: 8px;
  background: black;
  color: white;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #333;
  }
`;
