import ReactPaginate from 'react-paginate';

import css from './Pagination.module.css'

interface Pagination {
    totalPages: number;
    setPage: (page: number) => void;
    currentPage: number;
}

export default function Pagination ({totalPages, setPage, currentPage}: Pagination) {
    return (
        <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={({ selected }) => setPage(selected + 1)}
            forcePage={currentPage - 1}
            containerClassName={css.pagination}
            activeClassName={css.active}
            nextLabel="→"
            previousLabel="←"
        />
    );
}