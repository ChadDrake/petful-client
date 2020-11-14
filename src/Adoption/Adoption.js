import React, { Component } from "react";
import petsService from "../services/pets-service";
import peopleService from "../services/people-services";
import { Link } from "react-router-dom";
import "./Adoption.css";

export default class Adoption extends Component {
  state = {
    dog: {
      age: 3,
      breed: "Golden Retriever",
      description:
        "A smiling golden-brown golden retreiver listening to music.",
      gender: "Male",
      imageURL:
        "https://images.pexels.com/photos/33053/dog-young-dog-small-dog-maltese.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      name: "Zim",
      story: "Owner Passed away",
    },
    cat: {
      age: 3,
      breed: "Tabby",
      description: "boxer dog",
      gender: "Male",
      imageURL:
        "https://images.pexels.com/photos/1472999/pexels-photo-1472999.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      name: "Vince the Pince",
      story: "Found in neighborhood",
    },
    people: null,
    error: null,
    autoAdopt: true,
    count: 0,
  };
  updatePets = () => {
    return petsService.getPets().then((res) => {
      this.setState({ dog: res.dog, cat: res.cat });
    });
  };

  updatePeople = () => {
    return peopleService.getPeople().then((res) => {
      this.setState({ people: [...res, "Me"] });
    });
  };
  adoptCat = () => {
    petsService.adopt("cat").then(() => {
      this.setState((prevState) => ({
        people: prevState.people.slice(1),
      }));
    });
  };
  adoptDog = () => {
    petsService.adopt("dog").then(() => {
      this.setState((prevState) => ({
        people: prevState.people.slice(1),
      }));
    });
  };
  peopleString = () => {
    let result = "";
    if (this.state.people) {
      for (let i = 0; i < this.state.people.length; i++) {
        if (
          i === this.state.people.length - 1 &&
          this.state.people.length !== 1
        ) {
          result = result + "and " + this.state.people[i];
          break;
        }
        result = result + this.state.people[i] + ", ";
      }
    }

    return result;
  };
  componentDidMount() {
    this.updatePets();
    this.updatePeople();
    setInterval(this.serveACustomer, 5000, 0);
  }

  serveACustomer = () => {
    if (!this.state.error) {
      if (this.state.people[0] !== "Me") {
        if (this.state.people && this.state.people.length > 1) {
          let die = Math.floor(Math.random() * 2) + 1;
          let type = "cat";
          if (die === 2) {
            type = "dog";
          }
          petsService
            .adopt(type)
            .then(() => {
              this.setState((prevState) => ({
                people: prevState.people.slice(1),
              }));
            })
            .then(() => {
              this.updatePets();
            })
            .catch((e) => this.setState({ error: e.message }));
        }
      } else if (this.state.people && this.state.people.length < 5) {
        let people = ["Chad Drake", "John Smith", "Jane Doe", "Dr. Jones"];
        let person = people[this.state.count % people.length];

        this.setState((prevState) => ({
          people: [...prevState.people, person],
        }));

        this.setState((prevState) => ({ count: prevState.count + 1 }));
      }
    }
  };

  render() {
    if (this.state.people && this.state.people[0] !== "Me") {
      return (
        <section>
          <p>
            The current queue is: {this.peopleString()}. The pets up for
            adoption are:
          </p>{" "}
          <br />
          <div className="petDisplay">
            <p>
              First we have {this.state.cat.name} a {this.state.cat.age} year
              old {this.state.cat.gender} {this.state.cat.breed} whose story is
              "{this.state.cat.story}"
            </p>
            <br />
            <img
              src={this.state.cat.imageURL}
              alt={this.state.cat.description}
            />
            <br />
          </div>
          <div className="petDisplay">
            <p>
              {" "}
              And next is {this.state.dog.name} a {this.state.cat.age} year old{" "}
              {this.state.dog.gender} {this.state.dog.breed} whose story is "
              {this.state.dog.story}"
            </p>
            <br />
            <img
              src={this.state.dog.imageURL}
              alt={this.state.dog.description}
            />
            <br />
          </div>
        </section>
      );
    } else {
      return (
        <section>
          <p>
            The current queue is: {this.peopleString()}. The pets up for
            adoption are:
          </p>{" "}
          <br />
          <div className="petDisplay">
            <p>
              First we have {this.state.cat.name} a {this.state.cat.age} year
              old {this.state.cat.gender} {this.state.cat.breed} whose story is
              "{this.state.cat.story}"
            </p>
            <br />
            <img
              src={this.state.cat.imageURL}
              alt={this.state.cat.description}
            />
            <br />
          </div>
          <div className="petDisplay">
            <p>
              {" "}
              And next is {this.state.dog.name} a {this.state.cat.age} year old{" "}
              {this.state.dog.gender} {this.state.dog.breed} whose story is "
              {this.state.dog.story}"
            </p>
            <br />
            <img
              src={this.state.dog.imageURL}
              alt={this.state.dog.description}
            />
            <br />
          </div>
          <Link to="/" onClick={this.adoptCat}>
            <button>Adopt the cat!</button>
          </Link>
          <Link to="/" onClick={this.adoptDog}>
            <button>Adopt the dog!</button>
          </Link>
        </section>
      );
    }
  }
}
