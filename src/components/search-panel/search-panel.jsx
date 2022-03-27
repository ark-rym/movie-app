import React from 'react'
import { debounce } from 'debounce'

import './search-panel.scss'

const SearchPanel = ({ onInputChange }) => {
  const onChange = (e) => {
    const text = e.target.value
    onInputChange(text)
  }

  const onChangeDebounce = debounce(onChange, 1000)

  return (
    <header className="header">
      <input className="input" placeholder="Type to search..." autoFocus onChange={onChangeDebounce} />
    </header>
  )
}

export default SearchPanel
