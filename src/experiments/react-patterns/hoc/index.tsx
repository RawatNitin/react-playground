const WithLoading = (Component) => {
  return function ({ isLoading, ...rest }) {
    if (isLoading) {
      return <div>...loading</div>;
    }
    return <Component {...rest} />;
  };
};

const Name = ({ name, lastName }) => {
  return (
    <p>
      {name} {lastName}
    </p>
  );
};

const NameWithLoading = WithLoading(Name);

export const HOCPattern = () => {
  return <NameWithLoading isLoading={false} lastName={"rawat"} />;
};
