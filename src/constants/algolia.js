const airtableQuery = `
{
    allAirtable(filter: {table: {eq: "Projects"}}) {
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
                  src
                  aspectRatio
                  base64
                  sizes
                  srcSet
                }
              }
            }
          }
        }
      }
    }
  }
`;

const pageToAlgoliaRecord = ({ id, data: { name, type, date, image } }) => {
  return {
    objectID: id,
    name,
    type,
    date,
    image: { ...image.localFiles[0].childImageSharp.fluid },
  };
};

const queries = [
  {
    query: airtableQuery,
    transformer: ({ data: { allAirtable } }) =>
      allAirtable.nodes.map(pageToAlgoliaRecord),
  },
];

module.exports = queries;
