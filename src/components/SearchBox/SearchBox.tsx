import css from './SearchBox.module.css'

interface SearchBoxProps {
    getQuery: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBox({getQuery} : SearchBoxProps) {
    return (
        <input
            className={css.input}
            type="text"
            placeholder="Search notes"
            onChange={getQuery}
        />
    );
}