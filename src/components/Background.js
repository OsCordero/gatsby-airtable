import React from "react";
import BackgroundImage from "gatsby-background-image";
import styled, { keyframes } from "styled-components";
import { useStaticQuery, graphql } from "gatsby";

const query = graphql`
  {
    file(relativePath: { eq: "mainBcg.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
  }
`;
const Background = ({ children, image }) => {
  const {
    file: {
      childImageSharp: { fluid },
    },
  } = useStaticQuery(query);

  return (
    <Wrapper>
      <BackgroundImage
        preserveStackingContext
        Tag="div"
        className="bcg"
        fluid={image || fluid}
      >
        {children}
      </BackgroundImage>
    </Wrapper>
  );
};

const fadeIn = keyframes`
      from{
         background-color:rgb(0,0,0,0.7);
      }
      to{
        background-color:rgba(0,0,0,0.4);
      }
      `;

const Wrapper = styled.section`
  .bcg {
    /* MUST!!!!!! */
    min-height: 100vh;
    margin-top: -5rem;
    display: grid;
    place-items: center;
    animation: ${fadeIn} 1s ease-in-out 1 forwards;
  }
  .bcg::before {
    opacity: 1;
  }
`;
export default Background;
