function UserListHead({
    onAddClick,
    onModalOpen
}: UserListHeadProps) {

    const handleClick = () => {
        onModalOpen('Add')
        onAddClick()
    }

    return (
        <div className="py-5 px-10 flex justify-between items-center">
            <h3 className="font-bold xs:text-xs xl:text-2xl">Users List</h3>
            <button
                className="py-1 sm:py-3 px-4 sm:px-8 rounded-md text-1xl font-bold bg-blue-300 hover:bg-blue-500 transition-colors"
                onClick={handleClick}
            >Add +</button>
        </div>
    )
}

export default UserListHead