import { Component } from "react";

import SearchBar from "components/Gallery/SearchBar";
import ImageGallery from "./ImageGallery";
import Button from "shared/components/Button";
import Modal from '../../shared/components/Modal';
import Loader from '../../shared/components/Loader'

import { searchPhotos, PER_PAGE } from "../../shared/services/photos"

import styles from './gallery.module.css'

class Gallery extends Component {

    state = {
        hits: [],
        loading: false,
        error: null,
        q: "",
        page: 1,
        isModalOpen: false,
        modalBody: {}
        
    }

    async componentDidUpdate(prevProps, prevState) {
        const { q, page } = this.state
        
        if(q !== prevState.q || page > prevState.page){
        this.setState({
            loading: true, 
            error: null,
    })
            try {
                const { hits, totalHits } = await searchPhotos(q, page);
                this.setState(prevState => {
                    return {
                        hits: [...prevState.hits, ...hits],
                        totalHits,
                        loading: false,
                    }
                } )
            } catch(error) {
                this.setState({
                    loading: false,
                    error: error.message
                })
            }
        }
    }

    setSearch = ({ q }) => {
        this.setState({
            q,
            page: 1 ,
            hits:[],
        })
    } 

    loadMore = () => {
        this.setState(({ page }) => {
            return {
                page: page + 1
            }
        })
    }

    showModal = (modalBody) => {
        
        this.setState({ 
            modalBody,
            isModalOpen: true
        })
    }

    closeModal = () => {
    this.setState({ 
            isModalOpen: false
        })
    }

    render() {
        const { loading, hits, isModalOpen, modalBody } = this.state;
        const { setSearch, loadMore, showModal, closeModal } = this;

        return (
            <div className={styles.App}>
            <header className={styles.Searchbar}>
                <SearchBar onSubmit={setSearch} />
              
                {/* {!loading && Boolean(hits.length) } */}
                </header>
                  {loading && <Loader/>}
                {Boolean(hits.length) && (
                    <ImageGallery onClick={ showModal} hits={this.state.hits} />  
                )}
                {this.state.totalHits > PER_PAGE && <Button onClick={loadMore} text="Load More" />}
                {isModalOpen && (<Modal close={closeModal}> <img src={modalBody} alt="big" /> </Modal>)}
                </div>
    )}
}
export default Gallery;