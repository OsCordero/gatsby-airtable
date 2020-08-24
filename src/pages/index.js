import React from "react";
import { graphql } from "gatsby";
import {
  Layout,
  Hero,
  About,
  Survey,
  Slider,
  GridProjects,
} from "../components";
import SEO from "../components/seo";

const HomePage = ({ data }) => {
  const {
    allAirtable: { nodes: projects },
  } = data;

  return (
    <Layout>
      <SEO />
      <Hero projects={projects} />
      <About />
      <GridProjects projects={projects} title="Latest projects" />
      <Survey />
      <Slider />
    </Layout>
  );
};

export const query = graphql`
  {
    allAirtable(
      filter: { table: { eq: "Projects" } }
      limit: 4
      sort: { fields: data___date, order: DESC }
    ) {
      nodes {
        id
        data {
          type
          name
          date
          image {
            localFiles {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default HomePage;
