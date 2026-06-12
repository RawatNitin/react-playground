import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_AUTHORS_WITH_BOOKS = gql`
  query ExampleQuery {
    # books {
    #   title
    #   publishedYear
    #   author {
    #     name
    #   }
    # }

    authors {
      name
      books {
        title
        id
      }
    }
  }
`;

export const GrpahQlExperiment = () => {
  const { loading, error, data } = useQuery(GET_AUTHORS_WITH_BOOKS);
  return (
    <div>
      {loading && "loading"} {error && JSON.stringify(error)}{" "}
      {data && JSON.stringify(data)}
    </div>
  );
};
