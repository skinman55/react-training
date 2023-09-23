import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import "./App.css";
import ErrorBoundry from "../components/ErrorBoundry";
import Scroll from "../components/Scroll";

class App extends Component {
  constructor() {
    super();

    this.state = {
      robots: [],
      searchfield: "",
    };
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  };

  render() {
    const { robots, searchfield } = this.state;

    const filteredRobots = robots.filter((r) => {
      return r.name.toLowerCase().includes(searchfield.toLowerCase());
    });

    return robots.length ? (
      <div className="tc">
        <h1 className="f1">RoboFriends</h1>
        <SearchBox searchChange={this.onSearchChange} />
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

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((r) => r.json())
      .then((users) => this.setState({ robots: users }));
  }
}

export default App;
