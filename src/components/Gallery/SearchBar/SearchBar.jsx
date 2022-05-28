import PropTypes from 'prop-types';

import { Component } from "react";

import styles from './searchBar.module.css'

class SearchBar extends Component {

    state = {
        q: "",
    }
        handelChange = ({ target }) => {
            const { name, value } = target;
            this.setState({
                [name]: value
                
            })
        }
    
    handelSubmit = event => {
        event.preventDefault();
        this.props.onSubmit({ ...this.state });
        this.reset();
    }

    reset() {
        this.setState({
            q: "",
        })
    }
        
    render() {
        const { handelSubmit, handelChange } = this;
        const {q} = this.state
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
}

export default SearchBar;

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}