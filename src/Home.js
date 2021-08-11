import React, {useReducer} from 'react';
import FindPropForm from './components/FindPropForm';
import FilterTab from './components/FilterTab';
import PropertyList from './components/PropertyList';

function reduce(state, action) {
    return {city: action.city, lng: action.lng, lat: action.lat};
}

const initialState = {city: '', lng: null, lat: null};

function Home() {
  const [state, dispatch] = useReducer(reduce, initialState);
  const onSubmit = ({city, lng, lat}) => dispatch({city, lng, lat});

  return (
    <div className="py-5">
      <div className="container">
        <div className="row align-items-center py-5">
          <div className="display-5 my-1 col-md-6"><strong>Find the best property to host your event</strong></div>
          <div className="col-md-6 my-1"><FindPropForm {...{onSubmit}} /></div>
        </div>
      </div>
      <div className="container-fluid">
        {(state.city || (state.lng && state.lat)) && (
          <div>
            <hr />
            <FilterTab />
            <PropertyList {...state} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
