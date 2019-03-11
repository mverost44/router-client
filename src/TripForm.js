import React from 'react'

const TripForm = ({ handleChange, handleSubmit, trip }) => (
  <form onSubmit={handleSubmit}>
    <label>Trip Name</label >
    <input
      name="name"
      value={trip.name}
      placeholder="Name goes here"
      type="text"
      onChange={handleChange} />
    <label>Origin Point</label >
    <input
      name="origin"
      value={trip.origin}
      placeholder="Starting point goes here"
      type="text"
      onChange={handleChange} />
    <label>Destination</label >
    <input
      name="destination"
      type="text"
      value={trip.destination}
      placeholder="Destination point goes here"
      onChange={handleChange} />
    <label>To Do</label >
    <input
      name="todo"
      type="text"
      value={trip.todo}
      placeholder="Things to do go here"
      onChange={handleChange} />
    <label>Distance</label >
    <input
      name="distance"
      type="number"
      value={trip.distance}
      placeholder="Miles go here"
      onChange={handleChange} />
    <button type="submit">Submit</button>
  </form>
)

export default TripForm
