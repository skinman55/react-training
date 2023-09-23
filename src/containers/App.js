import React, { useState, useEffect } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import "./App.css";
import ErrorBoundry from "../components/ErrorBoundry";
import Scroll from "../components/Scroll";

export default function App() {
  const [searchField, setSearch] = useState("");
  const [robots, setRobots] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((r) => r.json())
      .then((users) => {
        setRobots(users);
      });
  }, []);

  function onSearchChange(event) {
    setSearch(event.target.value);
  }

  const filteredRobots = robots.filter((r) => {
    return r.name.toLowerCase().includes(searchField.toLowerCase());
  });

  return robots.length ? (
    <div className="tc">
      <h1 className="f1">RoboFriends</h1>
      <SearchBox searchChange={onSearchChange} />
      <Scroll>
        <ErrorBoundry>
          <CardList robots={filteredRobots} />
        </ErrorBoundry>
      </Scroll>
    </div>
  ) : (
    <h1>Loading</h1>
  );
}
