import React from 'react'
import GenreCards from './GenreCards'

function GenreCall() {
  return (
    <div>
      <div className='container'>
        <div className='row'>
            <div className='col-3'>
                <GenreCards/>
            </div>
            <div className='col-3'>
                <GenreCards/>
            </div>
            <div className='col-3'>
                <GenreCards/>
            </div>
            <div className='col-3'>
                <GenreCards/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default GenreCall
