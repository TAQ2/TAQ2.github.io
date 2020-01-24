import React, { useState } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

import Title from "./components/Title";
import { colours, screenBreakpoints } from "./theme";
import galleryData from "./galleryData";

// @Cleanup - bad name
const PieceContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: ${screenBreakpoints.maxContentWidth}px;
  margin: 0 5%;
  justify-content: center;

  // @Incomplete - this is only so that the footer looks ok
  // @Incomplete - this is overwridden in the media query
  margin-bottom: 2em;

  @media (min-width: ${screenBreakpoints.maxContentWidth}px) {
    margin: 0 auto;
  }
`;

const Container = styled(animated.div)`
  padding: 1em;
  margin-bottom: 1em;

  @media (max-width: ${screenBreakpoints.tablet}px) {
    transform: translateY(0px) !important; // removes the animation
  }
`;

// @Incomplete githubLink, appLink
function Piece({ img, name, githubLink, appLink }) {
  const [isHovered, setIsHovered] = useState(false);

  const animation = useSpring({
    transform: `translateY(${isHovered ? -20 : 0}px)`
  });

  return (
    <Container
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      style={{
        padding: "1em",
        marginBottom: "1em",
        ...animation
      }}
    >
      <div
        style={{
          position: "relative",
          // @Incomplete - should be 50 but we are relative to the whole container
          top: "47%",
          display: "flex",
          justifyContent: "space-between",
          padding: "0 10%",
          opacity: isHovered ? 1 : 0,
          zIndex: 1
        }}
      >
        <a // @Incomplete - should we be using the button component here?
          style={{
            width: "30%",
            textAlign: "center",
            backgroundColor: colours.primary,
            borderRadius: 5,
            padding: 5,
            textDecoration: "none"
          }}
          target="_blank"
          rel="noopener noreferrer"
          href={appLink}
        >
          View
        </a>
        <a
          style={{
            width: "30%",
            textAlign: "center",
            backgroundColor: colours.primary,
            borderRadius: 5,
            padding: 5,
            textDecoration: "none"
          }}
          target="_blank"
          rel="noopener noreferrer"
          href={githubLink}
        >
          Code
        </a>
      </div>
      <img
        alt={name}
        src={img}
        style={{
          height: 300,
          width: 300,
          borderRadius: "50%",
          filter: isHovered && "grayscale(50%)",
          border: `5px solid ${colours.secondaryDark}`
        }}
      />
      <div style={{ textAlign: "center", fontWeight: "bold" }}>{name}</div>
    </Container>
  );
}

export default function Gallery() {
  return (
    <div style={{ color: colours.secondary }}>
      <Title
        style={{
          textAlign: "center",
          marginBottom: "0.5em",
          backgroundColor: colours.primary
        }}
      >
        Gallery
      </Title>
      <PieceContainer>
        {/* @Cleanup - this div doesn't belong in the piece container */}
        <div style={{ marginBottom: "1em" }}>
          Here is where I do programmatic art stuff using p5.js. Here is where I
          do programmatic art stuff using p5.jsHere is where I do programmatic
          art stuff using p5.jsHere is where I do programmatic art stuff using
          p5.js
        </div>
        {galleryData.map((data, i) => (
          <Piece {...data} key={i} />
        ))}
      </PieceContainer>
    </div>
  );
}
