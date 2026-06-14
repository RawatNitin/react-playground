import { useDeferredValue, useMemo, useState, type ChangeEvent } from "react";

type User = {
  id: number;
  name: string;
};

const USERS: User[] = Array.from({ length: 10000 }, (_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
}));

const filterList = (search: string, users: User[]) => {
  return users.filter((user) => {
    let waste = 0;

    for (let i = 0; i < 10000; i++) {
      waste += i;
    }
    // console.log(waste);
    return user.name.includes(search);
  });
};

export const FilterList = () => {
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

  const list = useMemo(
    () => filterList(deferredSearch, USERS),
    [deferredSearch],
  );
  const isLoading = search !== deferredSearch;

  const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <label htmlFor="search">Search</label>
      <input id="search" type="text" value={search} onChange={onChangeSearch} />
      {isLoading ? "Loading" : ""}
      <Results users={list} search={search} />
    </div>
  );
};

function Results({ users, search }: { users: User[]; search: string }) {
  console.log("Results render", search);

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
