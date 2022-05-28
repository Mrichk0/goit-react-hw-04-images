import { Component } from 'react';
import styles from './loader.module.css'

class Loader extends Component {
  render() {
    return (
    <div className={styles.spinnerContainer}>
      <div className={styles.loadingSpinner}>
      </div>
    </div>
    );
  }
}

export default Loader;