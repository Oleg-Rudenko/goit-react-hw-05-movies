import {lazy, Suspense} from 'react';
import { Route, Switch } from 'react-router-dom';
import Container from './components/Container';
import AppBar from './components/AppBar';
import Loader from './components/Loader';

const HomePage = lazy(() => import('./views/HomePage' /*webpackChunkName: "HomePage"*/))
const MoviesPage = lazy(() => import('./views/MoviesPage' /*webpackChunkName: "MoviesPage"*/))
const MovieDetailsPage = lazy(() => import('./views/MovieDetailsPage' /*webpackChunkName: "MovieDetailsPage"*/))
const NotFoundView = lazy(() => import('./views/NotFoundView.jsx' /*webpackChunkName: "NotFoundView"*/))

export default function App() {
  return (
    <Container>
      <AppBar />

      <Suspense fallback={<Loader />}>

        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>

          <Route exact path="/movies">
            <MoviesPage />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>
          
          <Route>
            <NotFoundView />
          </Route>
        </Switch>

      </Suspense>

    </Container>
  )
}

