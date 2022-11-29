import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const Headers = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  background-color: white;
  color: #000;
  position: relative;
  z-index: 500;
  @media only Screen and (max-width: 64em) {
    padding: 0.5rem 3rem;
  }
  @media only Screen and (max-width: 40em) {
    padding: 0.5rem 1.5rem;
  }
`;

const Nav = styled.nav`
  width: 30rem;
  max-width: 60rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.3s;
  @media only Screen and (max-width: 48em) {
    display: none;
  }
  a {
    font-weight: 600;
    line-height: 1.5;
    color: #000;
    &::after {
      content: "";
      display: block;
      height: 3px;
      width: 0;
      background: transparent;
      transition: width 0.5s;
    }
    &:not(:last-child):hover::after {
      width: 100%;
      background: var(--purple);
    }
    /* &:not(:last-child) {
      margin-right: 2rem;
    } */
    /* @media only Screen and (max-width: 48em) {
      &:not(:last-child) {
        margin-right: 1rem;
      }
    } */
  }
`;

const Button = styled.button`
  background-color: var(--purple);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  color: var(--white);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.1);
  }
  &:focus {
    transform: scale(0.9);
  }
  @media only Screen and (max-width: 40em) {
    font-size: 1.2rem;
    &:hover {
      transform: none;
    }
    &:focus {
      transform: none;
    }
  }
`;
const HamburgerBtn = styled.button`
  display: none;
  @media only Screen and (max-width: 48em) {
    display: inline-block;
  }
  position: relative;
  background-color: transparent;
  width: 2rem;
  height: 2px;
  margin-top: 0rem;
  transition: all 0.3s;
  cursor: pointer;
  &::before,
  &::after {
    content: "";
    background-color: var(--white);
    width: 2rem;
    height: 2px;
    display: inline-block;
    position: absolute;
    left: 0;
    cursor: pointer;

    transition: all 0.3s;
  }
  &::before {
    top: ${(props) => (props.clicked ? "0" : "-0.5rem")};
    transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
  }
  &::after {
    top: ${(props) => (props.clicked ? "0" : "0.5rem")};
    transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
  }
`;

const MobileMenu = styled.nav`
  display: none;
  @media only Screen and (max-width: 48em) {
    display: flex;
  }
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  overflow-x: hidden;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  opacity: ${(props) => (props.clicked ? "1" : 0)};
  visibility: ${(props) => (props.clicked ? "visible" : "hidden")};
  transition: all 0.5s;
  z-index: -10;
  background-color: rgb(53 53 63 / 95%);
  border-radius: 20px;
  margin: 0.5rem;
  a {
    color: var(--white);
    font-weight: 600;
    font-size: 1.5rem;
    margin: 1.5rem;
    cursor: pointer;
  }
`;
const Header = () => {
  const [click, setClick] = useState(false);
  //const handleClick = () => setClick(!click);
  const ref = useRef(null);

  gsap.registerPlugin(ScrollTrigger);

  const scrollUp = (id, e) => {
    e.preventDefault();
    const element = document.getElementById(id);
    element.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  };

  const handleClick = (id, e) => {
    setClick(!click);
    scrollUp(id, e);
  };

  useEffect(() => {
    const element = ref.current;

    const mq = window.matchMedia("(max-width: 40em)");
    // console.log("mq", mq);
    if (mq.matches) {
      gsap.to(element, {
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        padding: "1rem 2.5rem",

        borderRadius: "0 0 50px 50px",

        border: "2px solid var(--white)",

        duration: 1,
        ease: "power1.out",

        scrollTrigger: {
          trigger: element,
          start: "bottom+=200 top",
          end: "+=100",
          scrub: true,
        },
      });
    } else {
      gsap.to(element, {
        position: "fixed",
        top: "1rem",
        left: "3rem",
        right: "3rem",
        padding: "1.5rem 2rem",

        borderRadius: "50px",

        border: "3px solid var(--white)",

        duration: 1,
        ease: "power1.out",

        scrollTrigger: {
          trigger: element,
          start: "bottom+=300 top",
          end: "+=250",
          scrub: true,
        },
      });
    }
  }, []);

  return (
    <Headers ref={ref}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <img
          src="data:image/jpeg;base64,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"
          alt="103 r suguuli"
          style={{
            width: "100px",
            display: "inline-block",
          }}
        />
        <h3>103-р сургууль</h3>
      </div>

      <Nav>
        <a href="#home" onClick={(e) => scrollUp("home", e)}>
          Нүүр хуудас
        </a>
        <a href="#about" onClick={(e) => scrollUp("about", e)}>
          Бидний тухай
        </a>
        <a href="#services" onClick={(e) => scrollUp("services", e)}>
          Заавар
        </a>
        <a href="https://www.facebook.com/groups/1794613087387725/">
          <Button>Манай сургууль</Button>
        </a>
      </Nav>
      <HamburgerBtn clicked={click} onClick={() => setClick(!click)}>
        <span></span>
      </HamburgerBtn>
      <MobileMenu clicked={click}>
        <a href="#home" onClick={(e) => handleClick("home", e)}>
          Home
        </a>
        <a href="#about" onClick={(e) => handleClick("about", e)}>
          About Us
        </a>
        <a href="#services" onClick={(e) => handleClick("services", e)}>
          Services
        </a>
        <a href="#contact" onClick={(e) => handleClick("contact", e)}>
          <Button>Contact Us</Button>
        </a>
      </MobileMenu>
    </Headers>
  );
};

export default Header;
