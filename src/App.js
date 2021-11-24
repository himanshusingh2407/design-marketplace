import React, { useReducer, useRef } from 'react';
import { getImageUrl } from './Utils';
import { useFetch, useInfiniteScroll, useLazyLoading } from './customHooks'
import './App.css';

function App() {
  const imgReducer = (state, action) => {
    switch (action.type) {
      case 'STACK_IMAGES':
        return { ...state, images: state.images.concat(action.images) }
      case 'FETCHING_IMAGES':
        return { ...state, fetching: action.fetching }
      default:
        return state;
    }
  }

  const pageReducer = (state, action) => {
    switch (action.type) {
      case 'ADVANCE_PAGE':
        return { ...state, page: state.page + 1 }
      default:
        return state;
    }
  }

  const [pager, pagerDispatch] = useReducer(pageReducer, { page: 0 });
  const [imgData, imgDispatch] = useReducer(imgReducer, { images: [], fetching: true, });

  let bottomBoundaryRef = useRef(null);
  useFetch(pager, imgDispatch);
  useLazyLoading('.card-img-top', imgData.images);
  useInfiniteScroll(bottomBoundaryRef, pagerDispatch);

  return (
    <div>
      <h1 className="page-title">Design Marketplace</h1>
      <div id='images'>
        <div className="row">
          {imgData.images.map((image, index) => {
            const { name, thumbnail, id } = image;
            const imageUrl = getImageUrl(id, thumbnail);
            return (
              <div key={index} className="card">
                <div className="card-body ">
                  <img
                    alt={name}
                    data-src={imageUrl}
                    className="card-img-top"
                  />
                </div>
                <div className="card-footer">
                  <div className="card-name">{name}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {imgData.fetching && (
        <div className="loader">Loading images...</div>
      )}
      <div id='page-bottom-boundary' ref={bottomBoundaryRef}></div>
    </div>
  );
}

export default App;
