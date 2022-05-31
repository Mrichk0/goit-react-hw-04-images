import PropTypes from 'prop-types';

import { useState } from 'react';

import styles from './searchBar.module.css'

const SearchBar = ({ onSubmit }) => {
    const [q, setQ] = useState('')

    const handelChange = ({ target }) => {
        const { value } = target;
        setQ(value)
    }

    const reset = () => {
        setQ("")
    }

    const handelSubmit = event => {
        event.preventDefault();
        onSubmit({ q });
        reset();
    }

    return (
        <form onSubmit={handelSubmit} className={styles.SearchForm}>
             <button type="submit" className={styles.SearchFormButton}>
            search
            </button> 
            <input
            value={q}
            onChange={handelChange}
            name='q'
            className={styles.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            required
            />
        </form>
    
    )
}

export default SearchBar;

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}