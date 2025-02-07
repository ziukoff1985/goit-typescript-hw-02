import './App.css';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { fetchImages } from './services/api';
import Loader from './components/Loader/Loader';
import ImageGallery from './components/ImageGallery/ImageGallery';
import SearchBar from './components/SearchBar/SearchBar';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';
import ErrorNotification from './components/NoResultsNotification/NoResultsNotification';
import TypingEffectMessage from './components/TypingEffectMessage/TypingEffectMessage';
import { Image, FetchImagesResponse } from './services/types';

// interface URL {
//   small: string;
//   regular: string;
// }

// interface Image {
//   id: string;
//   urls: URL;
//   alt_description?: string;
//   likes: number;
//   description?: string;
// }

// interface FetchImagesResponse {
//   results: Image[];
//   total_pages: number;
// }

function App() {
  const [query, setQuery] = useState<string>('');
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [modalImage, setModalImage] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isNoResults, setIsNoResults] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [typingMessage, setTypingMessage] = useState<boolean>(true);

  useEffect(() => {
    const fetchImagesData = async () => {
      setIsLoading(true);
      setIsError(false);
      setIsNoResults(false);
      setTotalPages(0);
      setTypingMessage(false);

      try {
        const { results, total_pages }: FetchImagesResponse = await fetchImages(
          query,
          page
        );

        if (results.length === 0) {
          setIsNoResults(true);
          setTypingMessage(true);
        }

        setImages(prevImages => [...prevImages, ...results]);
        setTotalPages(total_pages);

        if (page === total_pages) {
          toast.error('Oops, this is the last page 🤷‍♂️');
        }
      } catch (error) {
        setIsError(true);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (query) {
      fetchImagesData();
    }
  }, [query, page]);

  const handleSearchSubmit = (newQuery: string) => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleImageClick = (imageUrl: string) => {
    setModalImage(imageUrl);
    setIsModalOpen(true);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearchSubmit} />
      <Toaster position="top-right" reverseOrder={false} />
      {typingMessage && <TypingEffectMessage />}
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={handleImageClick} />
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {isNoResults && <ErrorNotification />}
      {images.length > 0 && page < totalPages && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      <ImageModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        image={modalImage}
      />
    </>
  );
}

export default App;
