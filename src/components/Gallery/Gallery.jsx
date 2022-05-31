import { useState, useEffect } from "react";

import SearchBar from "components/Gallery/SearchBar";
import ImageGallery from "./ImageGallery";
import Button from "shared/components/Button";
import Modal from '../../shared/components/Modal';
import Loader from '../../shared/components/Loader'

import { searchPhotos, PER_PAGE } from "../../shared/services/photos"

import styles from './gallery.module.css'

const Gallery = () => {
    const [gallery, setGallery] = useState({
        hits: [],
        loading: false,
        error: null,
    });
    const [q, setQ] = useState('');
    const [page, setPage] = useState(1);
    const [modal, setModal] = useState({
        isModalOpen: false,
        modalBody: {}
    })

    useEffect(() => {
        const fetchPosts = async  () => {
            setGallery({
                hits,
                loading: q !== '',
                error: null
            })
            
            if (q !== '') {
                try {
                    const { hits, totalHits } = await searchPhotos(q, page); 
                    setGallery(prevState => ({
                        ...prevState,
                        hits: [...prevState.hits, ...hits],
                        loading: false,
                        totalHits
                    }))
                } catch (error) {
                    setGallery({ 
                        hits,
                        loading: false,
                        error: error.massage,
                        totalHits: 0 })
                }                  
            } 
        } 
        fetchPosts()
    }, [q, page]) 

    const setSearch = ({ q }) => {
        setQ(q);
        setPage(1);
        setGallery({...gallery,  hits: [] })
    }

    const showModal = ( modalBody ) => {
        setModal({
        isModalOpen: true,
        modalBody
        })
}

    const loadMore = () => {
        setPage( prevPage  => prevPage + 1) 
    } 

    const closeModal = () => {
        setModal({
            isModalOpen: false
        })
    }
     
    const { hits, loading, totalHits } = gallery;
    const {isModalOpen, modalBody} = modal   
            return (
            <div className={styles.App}>
            <header className={styles.Searchbar}>
                <SearchBar onSubmit={setSearch} />
            </header>
                    {loading && <Loader />}
                {Boolean(hits.length) && (
                    <ImageGallery onClick={ showModal} hits={hits} />  
                )}
                {totalHits > PER_PAGE && <Button onClick={loadMore} text="Load More" />}
                {isModalOpen && (<Modal close={closeModal}> <img src={modalBody} alt="big" /> </Modal>)}
                </div>
    )
}

export default Gallery;