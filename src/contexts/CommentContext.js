import { createContext, useContext } from 'react';

const CommentContext = createContext();

export default function CommentProvider({ children }) {
    return (
        <CommentContext.Provider value={{}}>
            {children}
        </CommentContext.Provider>
    );
}

export const useComment = () => useContext(CommentContext);
