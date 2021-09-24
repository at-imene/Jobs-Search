import React, { useCallback } from 'react'
import { Pagination } from 'react-bootstrap'

export default function JobPagination({ page, setPage, hasNextPage }) {

    const handleChangePage = useCallback((amount) => {
        setPage(page => page + amount)
    }, [page])
    console.log('PAGINATION HAS NEXT PAGE -------------------------', hasNextPage)
    return (
        <Pagination>
            {page !== 1 && <Pagination.Prev onClick={() => handleChangePage(-1)} />}
            {page !== 1 && <Pagination.Item onClick={() => handleChangePage(-1)}> 1</Pagination.Item>}
            {page > 3 && <Pagination.Ellipsis />}
            {page > 2 && <Pagination.Item onClick={() => handleChangePage(-1)}>{page - 1}</Pagination.Item>}
            <Pagination.Item active>{page}</Pagination.Item>

            {hasNextPage && <Pagination.Item onClick={() => handleChangePage(1)}>{page + 1}</Pagination.Item>}
            {hasNextPage && <Pagination.Next onClick={() => handleChangePage(1)} />}

        </ Pagination>
    )
}
