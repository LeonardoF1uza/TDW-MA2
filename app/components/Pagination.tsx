// src/components/Pagination.tsx
import type { Container } from "postcss";
import type { CSSProperties, Dispatch, SetStateAction } from "react";

export default function Pagination({
    page,
    setPage,
    total,
    perPage,
}: {
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    total: number;
    perPage: number;
}) {
    const totalPages = Math.max(1, Math.ceil(total / perPage));
    const goUp = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    return (
        <div style={Style.Container}>   
            <button style={Style.button} onClick={() => [setPage(Math.max(1, page - 1)), goUp()]} >Prev</button>
            <div> {page} / {totalPages} </div>
            <button style={Style.button} onClick={() => [setPage(Math.min(totalPages, page + 1)), goUp()]} >Next</button>
        </div>
    );
}

const Style: Record<string, CSSProperties> = {
    Container: {
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '16px',
        marginBottom: '100px',

    },

    buttonContainer: {
        marginRight: '50px',
        marginLeft: '10px',
        paddingLeft: '10px',
        height: 'fit-content',
        display: 'flex',
        gap: '8px',
    },
    button: {
        height: 'fit-content',
        textTransform: 'capitalize',
        backgroundColor: '#e2e8f0',
        padding: '8px 16px',
        borderRadius: '4px',
        border: 'none',
        cursor: 'pointer',
    }
}