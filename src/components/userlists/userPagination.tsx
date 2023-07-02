function UserPagination({
    currentPage,
    totalPage,
    handlerPrevPage,
    handlerNextPage,
    handlerPageSelect
}: UserPagination) {

    const pageNumber = Array.from({ length: totalPage }, (_, index) => index + 1)
    return (
        <div className="fixed bottom-4 right-4 flex gap-3 font-bold text-xl">
            <button
                className="hover:text-blue-500"
                onClick={handlerPrevPage}
            >
                &lt;</button>
            {pageNumber.map((page) => <button onClick={() => handlerPageSelect(page)} key={page} className={`${page === currentPage ? 'text-blue-500' : ''} hover:text-blue-500`} >{page}</button>)}
            <button
                className="hover:text-blue-500"
                onClick={handlerNextPage}
            >
                &gt;</button>
        </div>
    )
}

export default UserPagination