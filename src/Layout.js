import React, { Fragment } from 'react'
import MyMapComponent from './Map'

const Layout = ({ children }) => (
  <Fragment>
    <div className="left">
      { children }
    </div>
    <div className="right">
      <MyMapComponent isMarkerShown={false} />
    </div>
  </Fragment>
)

export default Layout
