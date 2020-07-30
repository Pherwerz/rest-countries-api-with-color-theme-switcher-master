import React, { Component } from 'react';
import classes from './Country.module.scss';
import { withRouter } from 'react-router-dom';
import axios from '../../../../axios';
import Container from '../../../Container/Container';
import Links from '../../../../components/Link/Link';
import LoadingBar from 'react-top-loading-bar';

class Country extends Component {
  state = {
    path: this.props.match.params.id,
    country: null,
    borderName: [],
    progress: 0
  };

  componentDidMount() {
    this.getData(this.state.path);
  }

  reLoad = el => {
    this.getData(el);
  };

  getData = path => {
    if (this.props.match.params.id) {
      axios
        .get(`/alpha/${path}`)
        .then(res => {
          const names = [];
          let status = {};

          res.data.borders.forEach((el, i, arr) => {
            axios
              .get(`/alpha/${el}`)
              .then(res2 => {
                names.push(res2.data.name);
                this.setState({
                  progress: (100 / arr.length) * (i + 1)
                });

                if (i === arr.length - 1) {
                  this.setState({
                    borderName: names,
                    country: { ...status },
                    progress: 100
                  });
                }
              })
              .catch(err => console.log(err));
          });

          status = {
            flag: res.data.flag,
            name: res.data.name,
            lists: [
              {
                name: 'Native Name',
                data: res.data.nativeName
              },
              {
                name: 'Population',
                data: new Intl.NumberFormat().format(
                  res.data.population
                )
              },
              {
                name: 'Region',
                data: res.data.region
              },
              {
                name: 'Sub Region',
                data: res.data.subregion
              },
              {
                name: 'Capital',
                data: res.data.capital
              },
              {
                name: 'Top Level Domain',
                data: res.data.topLevelDomain
              },
              {
                name: 'Currency',
                data: res.data.currencies.map(
                  cur => cur.name
                )
              },
              {
                name: 'Language',
                data: res.data.languages.map(
                  cur => cur.name
                )
              }
            ],
            border: res.data.borders
          };
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  render() {
    let data;

    if (this.state.country) {
      data = (
        <div className={classes.CountryItem}>
          <div className={classes.CountryLeft}>
            <img
              src={this.state.country.flag}
              alt={this.state.country.name}
            />
          </div>
          <div className={classes.CountryRight}>
            <h2>{this.state.country.name}</h2>

            <ul className={classes.CountryList}>
              {this.state.country.lists.map((cur, i) => (
                <li
                  key={i}
                  className={classes.CountryItems}
                >
                  <h4>{cur.name} : &nbsp;</h4>{' '}
                  {Array.isArray(cur.data)
                    ? cur.data.join(', ')
                    : cur.data}
                </li>
              ))}
            </ul>

            <div className={classes.CountryBorder}>
              <h4>Border Countries : &nbsp;</h4>{' '}
              <div className={classes.CountryLine}>
                {this.state.country.border.map((cur, i) => (
                  <Links
                    path={cur}
                    clicked={() => this.reLoad(cur)}
                    key={i}
                  >
                    {this.state.borderName[i]}
                  </Links>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      data = '';
    }

    return (
      <section className={classes.Country}>
        <LoadingBar
          color="var(--text-color)"
          progress={this.state.progress}
          onLoaderFinished={() =>
            this.setState({ progress: 0 })
          }
          height={3}
        />
        <Container>
          <Links path="/">&#8592;&nbsp;&nbsp; Back</Links>

          {data}
        </Container>
      </section>
    );
  }
}

export default withRouter(Country);
