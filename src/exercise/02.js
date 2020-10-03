// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import React from 'react'

function useLocalStorageState(key, defaultValue = '') {
  const [state, setState] = React.useState(() => {
    const value = window.localStorage.getItem(key)
    if (value) {
      try {
        return JSON.parse(window.localStorage(key))
      } catch {
        window.localStorage.removeItem(key)
      }
    }

    return typeof defaultValue === 'function' ? defaultValue() : defaultValue
  })

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}

function useCustomHook(initialName) {
  const [name, setName] = React.useState(
    window.localStorage.getItem('name') || initialName,
  )

  React.useEffect(() => {
    window.localStorage.setItem('name', name)
  })

  return [name, setName]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)
  // const [name, setName] = useCustomHook(initialName)

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" value={name} />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
