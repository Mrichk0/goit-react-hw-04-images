import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem';

import styles from './imageGallery.module.css'

const ImageGallery = ({ hits, onClick }) => {
    const elements = hits.map(({webformatURL, id, largeImageURL}) => ( 
        <ImageGalleryItem
            onClick={ () => onClick(largeImageURL)}
            key={id}
            url={webformatURL}
        />
) ) 

    return (
        <ul className={styles.ImageGallery}>
            {elements}
        </ul> 
    )
}

ImageGallery.defaultProps = {
    hits: []
}

ImageGallery.propTypes = {
    hits: PropTypes.arrayOf(PropTypes.shape({
        webformatURL: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        largeImageURL: PropTypes.string.isRequired,
    })).isRequired,
    onClick: PropTypes.func.isRequired,
}

export default ImageGallery;