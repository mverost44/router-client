import React, { Fragment } from 'react'
import MapWithADirectionsRenderer from './MapWithDirections'

const Layout = ({ children }) => (
  <Fragment>
    <div className="left">
      { children }
    </div>
    <div className="right">
      <MapWithADirectionsRenderer />
    </div>
  </Fragment>
)

export default Layout
