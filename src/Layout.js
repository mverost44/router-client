import React, { Fragment } from 'react'

const Layout = ({ children }) => (
  <Fragment>
    <div className="left">
      { children }
    </div>
    <div className="right">
      <img src="https://i.imgur.com/YjrwCJ9.png" />
    </div>
  </Fragment>
)

export default Layout
