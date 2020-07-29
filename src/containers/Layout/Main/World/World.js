import React, { Component } from 'react';
import Container from '../../../Container/Container';
import classes from './World.module.scss';
import icon from '../../../../images/icons.svg';
import axios from '../../../../axios';
import { Link } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

const region = [
  'Africa',
  'Americas',
  'Asia',
  'Europe',
  'Oceania'
];

class World extends Component {
  state = {
    country: [],
    input: '',
    show: false,
    progress: 0
  };

  componentDidMount() {
    axios
      .get('/all')
      .then(res => {
        this.setState({ country: res.data, progress: 100 });
      })
      .catch(err => {
        console.log(err);
      });
  }

  formSubmitted = e => {
    e.preventDefault();

    axios
      .get(`/name/${this.state.input}`)
      .then(res => {
        this.setState({ country: res.data, progress: 100 });
      })
      .catch(err => {
        console.log(err);
      });
  };

  inputHandler = e => {
    this.setState({ input: e.target.value });
  };

  buttonClicked = el => {
    axios
      .get(`/region/${el}`)
      .then(res => {
        this.setState({ country: res.data, progress: 100 });
      })
      .catch(err => {
        console.log(err);
      });
  };

  showHide = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    let dropdown;

    if (this.state.show) {
      dropdown = (
        <div className={classes.WorldOptions}>
          {region.map((cur, i) => (
            <button
              key={i}
              value={cur}
              className={classes.WorldDropBtn}
              onClick={() => this.buttonClicked(cur)}
            >
              {cur}
            </button>
          ))}
        </div>
      );
    } else {
      dropdown = null;
    }
    return (
      <section className={classes.World}>
        <LoadingBar
          color="var(--text-color)"
          progress={this.state.progress}
          onLoaderFinished={() =>
            this.setState({ progress: 0 })
          }
          height={4}
        />
        <Container>
          <div className={classes.WorldTop}>
            <form
              className={classes.WorldForm}
              onSubmit={this.formSubmitted}
            >
              <button className={classes.WorldBtn}>
                <svg>
                  <use
                    xlinkHref={`${icon}#icon-magnifying-glass`}
                  />
                </svg>
              </button>

              <input
                type="text"
                className={classes.WorldInput}
                placeholder="Search for a country..."
                value={this.state.input}
                onChange={this.inputHandler}
              />
            </form>

            <div className={classes.WorldDropdown}>
              <div className={classes.WorldSelect}>
                <button onClick={this.showHide}>
                  <p>Filter by Region</p>
                  <svg>
                    <use
                      xlinkHref={`${icon}#icon-chevron-down`}
                    />
                  </svg>
                </button>
              </div>
              {dropdown}
            </div>
          </div>

          <div className={classes.WorldWorlds}>
            {this.state.country.map((cur, i) => (
              <Link
                className={classes.WorldCountry}
                key={cur.alpha3Code}
                to={{
                  pathname: '/country/' + cur.alpha3Code
                }}
              >
                <div>
                  <div className={classes.WorldImg}>
                    <img
                      src={cur.flag}
                      alt={cur.alpha2Code}
                    />
                  </div>

                  <div className={classes.WorldDes}>
                    <h3>{cur.name}</h3>

                    <div className={classes.WorldItems}>
                      <h4>Population :</h4>
                      <span>{cur.population}</span>
                    </div>

                    <div className={classes.WorldItems}>
                      <h4>Region :</h4>
                      <span>{cur.region}</span>
                    </div>

                    <div className={classes.WorldItems}>
                      <h4>Capital :</h4>
                      <span>{cur.capital}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    );
  }
}

export default World;
