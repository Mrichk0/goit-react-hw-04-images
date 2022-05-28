import PropTypes from 'prop-types';
import styles from './button.module.css'

const Button = ({text, onClick}) => {
    return  <button onClick={onClick} className={styles.Button}>
                {text}
            </button>
    
} 

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Button;  
