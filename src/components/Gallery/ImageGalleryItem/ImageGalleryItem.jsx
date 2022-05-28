import PropTypes from 'prop-types'

import styles from './imageGalleryItem.module.css'

const imageGalleryItem = ({url, onClick}) => {
    
        return (
            <li onClick={ onClick } className={styles.ImageGalleryItem}>
                <img
                    className={styles.ImageGalleryItemImage }
                    src={url}
                    alt="small" />
            </li>
        )
}

imageGalleryItem.propTypes = {
    url: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default imageGalleryItem;