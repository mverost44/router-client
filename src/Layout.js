import React, { Fragment } from 'react'

const Layout = ({ children }) => (
  <Fragment>
    <div className="left">
      { children }
    </div>
    <div className="right">
      <img className="map" src="https://i.imgur.com/OtsRSS9.png" />
    </div>
  </Fragment>
)

export default Layout
