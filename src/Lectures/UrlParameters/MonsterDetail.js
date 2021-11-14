import React, { Component } from "react";
import Card from "./Components/Card/Card";
import "./MonsterDetail.scss";

class MonsterDetail extends Component {
  state = {
    monster: {},
  };

  componentDidMount() {
    fetch(
      `https://jsonplaceholder.typicode.com/users/${this.props.match.params.id}`
    )
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          monster: res,
        });
      });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("업데이트!");
    if (prevProps.match.params.id !== this.props.match.params.id) {
      fetch(
        `https://jsonplaceholder.typicode.com/users/${this.props.match.params.id}`
      )
        .then((res) => res.json())
        .then((res) => {
          this.setState({
            monster: res,
          });
        });
    }
  }

  goToPrev = () => {
    this.props.history.push(
      `/monsters/detail/${Number(this.props.match.params.id) - 1}`
    );
  };

  goToNext = () => {
    this.props.history.push(
      `/monsters/detail/${Number(this.props.match.params.id) + 1}`
    );
  };

  goToMonsters = () => {
    this.props.history.push("/monsters/");
  };

  render() {
    const { monster } = this.state;
    console.log(monster);

    return monster.id ? (
      <div className="url-parameters">
        <div className="btn-wrapper">
          <button onClick={this.goToMonsters}>Back to Monsters List</button>
        </div>
        <Card
          key={monster.id}
          id={monster.id}
          name={monster.name}
          email={monster.email}
        />
        <div className="btn-wrapper">
          <button onClick={this.goToPrev}>Previous</button>
          <button onClick={this.goToNext}>Next</button>
        </div>
      </div>
    ) : null;
  }
}

export default MonsterDetail;
