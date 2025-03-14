"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Avatar, LogoutButton, LogoutPopup, NavItem, SidebarContainer, ToggleButton, UserProfile } from "./Sidebar.styled";
import { signOut } from "next-auth/react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import Image from "next/image";

export default function Sidebar() {
  const { data: session } = useSession();
  const userName = session?.user?.name || "Guest";
  const initial = userName.charAt(0);
  const [showLogout, setShowLogout] = useState(false);

  // Close the popup if clicked outside
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    if (!target.closest(".user-profile-container") && !target.closest(".logout-popup")) {
      setShowLogout(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);


  return (
    <>
      <SidebarContainer>
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={600}
          height={200}
          style={{ width: "100%", height: "auto", marginTop:"-20px" }}
        />
        <NavItem href="/admin">Leads</NavItem>
        <NavItem href="/settings">Settings</NavItem>
        <UserProfile className="user-profile-container">
          <div onClick={() => setShowLogout((prev) => !prev)} style={{ display: "flex", alignItems: "center", gap:"10px", cursor: "pointer" }}>
            <Avatar>{initial}</Avatar>
            <span>{userName}</span>
            {showLogout ? <FaCaretUp /> : <FaCaretDown />}
          </div>
          {showLogout && (
            <LogoutPopup className="logout-popup">
              <LogoutButton onClick={() => signOut()}>Logout</LogoutButton>
            </LogoutPopup>
          )}
        </UserProfile>
      </SidebarContainer>
    </>
  );
}
