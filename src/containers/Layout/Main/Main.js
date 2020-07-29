import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import World from './World/World';

const AsynCountry = React.lazy(() =>
  import('./Country/Country')
);

const Main = props => (
  <main>
    <Switch>
      <Route path="/country/:id">
        <Suspense fallback={<div>loading...</div>}>
          <AsynCountry />
        </Suspense>
      </Route>
      <Route path="/" component={World} />
    </Switch>
  </main>
);

export default Main;
