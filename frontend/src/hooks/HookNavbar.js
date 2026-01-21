import { useState } from "react";

export function HookNavbar() {

  const [navbarToggle, setNavbarToggle] = useState(false);
  const [navbarMenu, setNavbarMenu] = useState(false);

  const handleToggle = (setters) => {
    setters(prev => !prev);
  };

  return {
    navbarToggle, setNavbarToggle,
    navbarMenu, setNavbarMenu,
    handleToggle,
  }
}