import React, { useReducer, useRef } from 'react';
import { useFetch, useInfiniteScroll, useLazyLoading } from './customHooks';
import { DesignCards } from './DesignCard';
import { imgReducer, pageReducer } from './Reducer';
import './App.css';

function App() {
  const [pager, pagerDispatch] = useReducer(pageReducer, { page: 0 });
  const [imgData, imgDispatch] = useReducer(imgReducer, { images: [], fetching: true, });

  let bottomBoundaryRef = useRef(null);
  useFetch(pager, imgDispatch);
  useLazyLoading('.card-img-top', imgData.images);
  useInfiniteScroll(bottomBoundaryRef, pagerDispatch);

  
  return (
    <>
      <h1 className="page-title">Design Marketplace</h1>
      <div id='images'>
        <div className="row">
          {DesignCards(imgData)}
        </div>
      </div>

      {imgData.fetching && (
        <div className="loader">Loading images...</div>
      )}
      <div id='page-bottom-boundary' ref={bottomBoundaryRef}></div>
    </>
  );
}

export default App;
