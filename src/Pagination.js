import React from 'react';

export default function Pagination({ gotoNextPage, gotoPrevPage }) {
  return (
    <div className='btn-container'>
      { gotoPrevPage && <button className='button-85' onClick={ gotoPrevPage }>Previous</button> }
      { gotoNextPage && <button className='button-85' onClick={ gotoNextPage }>Next</button> }
    </div>
  );
}
