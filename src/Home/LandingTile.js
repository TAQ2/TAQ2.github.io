import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";

import Link from "../components/Link";
import Tile from "../components/Tile";
import Title from "../components/Title";
import { colours, screenBreakpoints } from "../theme";
import meImg from "../assets/me.jpg";

const LinkContainer = styled.div`
  width: 100%;
  font-size: 2em;
  display: flex;
  justify-content: space-around;

  @media (max-width: ${screenBreakpoints.small}px) {
    font-size: 1.5em;
  }
`;

const Container = styled.div`
  display: flex;
  height: 100%;
  padding: 0 2.5%;
  margin: 0 auto;
  max-width: 1250px;

  @media (max-width: ${screenBreakpoints.desktop}px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const ImgContainer = styled(animated.div)`
  width: 47.5%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${screenBreakpoints.desktop}px) {
    width: 70%;
    height: 50%;
  }

  @media (max-width: ${screenBreakpoints.tablet}px) {
    width: 90%;
    height: 50%;
  }

  @media (max-width: ${screenBreakpoints.small}px) {
    width: 100%;
  }
`;

const TextContainer = styled(animated.div)`
  width: 47.5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${colours.primary};

  @media (max-width: ${screenBreakpoints.desktop}px) {
    width: 70%;
  }

  @media (max-width: ${screenBreakpoints.tablet}px) {
    width: 100%;
  }
`;

const Quote = styled.i`
  margin-bottom: 4em;
  text-align: center;

  @media (max-width: ${screenBreakpoints.small}px) {
    margin-bottom: 2em;
  }
`;

const Image = styled.img`
  max-height: 100%;
  max-width: 100%;
  width: auto;
  height: auto;
  border-radius: 50%;
  border: 10px solid ${colours.secondaryLight};
`;

export default function LandingTile({ infoSectionRef }) {
  const [imgHasLoaded, setImgHasLoaded] = useState(false);

  const imgAnimation = useSpring({
    transform: "scale(1)",
    from: { transform: "scale(0.3)" },
    config: { duration: 700 },
    immediate: imgHasLoaded
  });

  const textAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 900,
    config: { duration: 1200 },
    immediate: imgHasLoaded
  });

  const scrollToInfoSection = () => {
    window.scrollTo({
      top: infoSectionRef.current.offsetTop,
      left: 0,
      behavior: "smooth"
    });
  };

  return (
    <Tile
      colour={colours.secondary}
      style={{
        opacity: imgHasLoaded ? 1 : 0,
        display: "flex",
        alignItems: "center",
        backgroundColor: colours.secondary,
        backgroundImage:
          "repeating-linear-gradient(135deg, transparent, rgba(255,255,255,.02) 15px)"
      }}
    >
      <Container>
        <ImgContainer style={imgAnimation}>
          <Image src={meImg} alt="me" onLoad={() => setImgHasLoaded(true)} />
        </ImgContainer>
        <div style={{ width: "5%" }} />
        <TextContainer style={textAnimation}>
          <Title style={{ color: colours.primary, marginBottom: "0" }}>
            Arjun Gupta
          </Title>
          <div
            style={{
              fontSize: "1.6em",
              marginBottom: "1.5em",
              textAlign: "center"
            }}
          >
            Full Stack Web Developer
          </div>
          <Quote>
            I'm a London based developer, specialising in React. I love building
            and designing websites but also have a strong interest in how that
            influences business.
          </Quote>
          <LinkContainer>
            <Link style={{ width: "30%" }} onClick={scrollToInfoSection}>
              CV
            </Link>
            <Link style={{ width: "30%" }} to="/labs">
              Labs
            </Link>
            <Link style={{ width: "30%" }} to="/gallery">
              Gallery
            </Link>
          </LinkContainer>
        </TextContainer>
      </Container>
    </Tile>
  );
}
