import css from './App.module.css'
import { useState } from 'react';
import {useQuery, keepPreviousData} from '@tanstack/react-query'

import { useDebouncedCallback } from 'use-debounce';


import {fetchNotes} from '../../services/noteService'

import Modal from '../Modal/Modal'
import SearchBox from '../SearchBox/SearchBox';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import NoteForm from '../NoteForm/NoteForm';

export default function App() {

    const[ModalIsOpen, setModalIsOpen] = useState(false);
    const[currentPage, setCurrentPage] = useState(1);
    const[query, setQuery] = useState('');

    const{data} = useQuery({
        queryKey: ['note', currentPage, query],
        queryFn: () => fetchNotes(query, currentPage),
        placeholderData: keepPreviousData,
    });

    const total_Pages = data?.totalPages;

    const getQuery = useDebouncedCallback((event: React.ChangeEvent<HTMLInputElement>) => {setQuery(event?.target.value); setCurrentPage(1)}, 300);

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
                <SearchBox getQuery={getQuery}/>
                {total_Pages && total_Pages > 1 && <Pagination totalPages = {total_Pages} setPage={setCurrentPage} currentPage={currentPage}/>}
                <button className={css.button} onClick={() => setModalIsOpen(true)}>Create note +</button>

                
            </header>
            {data && <NoteList notes={data.notes} query={query} currentPage={currentPage}/>}

            {ModalIsOpen && <Modal onClose={() => setModalIsOpen(false)}> 
                    <NoteForm onClose={() => setModalIsOpen(false)} currentPage={currentPage} query={query}/> 
                </Modal>}
        </div>
    );
}