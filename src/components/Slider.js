import React, { useState, useEffect } from "react";
import { graphql, useStaticQuery } from "gatsby";
import Title from "./Title";
import styled from "styled-components";
import Image from "gatsby-image";
import { FaQuoteRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const query = graphql`
  {
    allAirtable(filter: { table: { eq: "Customers" } }) {
      nodes {
        id
        data {
          name
          quote
          title
          image {
            localFiles {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;

const Slider = () => {
  const {
    allAirtable: { nodes: customers },
  } = useStaticQuery(query);

  const [active, setActive] = useState(0);

  useEffect(() => {
    const lastIndex = customers.length - 1;
    if (active < 0) setActive(lastIndex);
    if (active > lastIndex) setActive(0);
  }, [active, customers]);

  return (
    <Wrapper className="section">
      <Title title="Reviews" />
      <div className="section-center">
        {customers.map((customer, index) => {
          const {
            id,
            data: { image, name, title, quote },
          } = customer;

          const maybeActive = index === active ? "activeSlide" : "nextSlide";
          const isLastSlide =
            index === active - 1 ||
            (active === 0 && index === customers.length - 1);

          return (
            <article
              className={isLastSlide ? "lastSlide" : maybeActive}
              key={id}
            >
              <Image
                fluid={image.localFiles[0].childImageSharp.fluid}
                className="img"
              />
              <h4>{name}</h4>
              <p className="title">{title}</p>
              <div className="text">{quote}</div>
              <FaQuoteRight className="icons" />
            </article>
          );
        })}
        <button className="prev" onClick={() => setActive(active - 1)}>
          <FaChevronLeft />
        </button>
        <button className="next" onClick={() => setActive(active + 1)}>
          <FaChevronRight />
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: var(--clr-grey-10);
  .section-center {
    margin-top: 4rem;
    width: 80vw;
    height: 450px;
    max-width: 800px;
    text-align: center;
    position: relative;
    display: flex;
    overflow: hidden;
    .img {
      border-radius: 50%;
      margin: 0 auto;
      margin-bottom: 1rem;
      width: 150px;
      height: 150px;
    }
    h4 {
      text-transform: uppercase;
      color: var(--clr-primary-5);
      margin-bottom: 0.25rem;
    }
    .title {
      text-transform: capitalize;
      margin-bottom: 0.75rem;
    }
    .text {
      max-width: 45em;
      margin: 0 auto;
      line-height: 2;
      color: var(--clr-grey-5);
    }
    .icon {
      font-size: 3rem;
      margin-top: 1rem;
      color: var(--clr-primary-5);
    }
    .prev,
    .next {
      position: absolute;
      top: 200px;
      transform: translateY(-50%);
      background: var(--clr-grey-5);
      color: var(--clr-white);
      width: 1.25rem;
      height: 1.25rem;
      display: grid;
      place-items: center;
      border-color: transparent;
      font-size: 1rem;
      border-radius: var(--radius);
      cursor: pointer;
      transition: var(--transition);
    }
    .prev:hover,
    .next:hover {
      background: var(--clr-primary-5);
    }
    .prev {
      left: 0;
    }
    .next {
      right: 0;
    }
    @media (min-width: 800px) {
      .prev,
      .next {
        width: 2rem;
        height: 2rem;
        font-size: 1.5rem;
      }
    }
    article {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: var(--transition);
    }
    article.activeSlide {
      opacity: 1;
      transform: translateX(0);
    }
    article.lastSlide {
      transform: translateX(-100%);
    }
    article.nextSlide {
      transform: translateX(100%);
    }
  }
`;
export default Slider;
