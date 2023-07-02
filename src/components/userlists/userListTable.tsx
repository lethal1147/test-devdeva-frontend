function UserListTable({
    onModalOpen,
    onEditClick,
    users,
    deleteUserHandler,
    fetchOneUser
}: UserListTableProps) {

    const handleEditClick = (userId: string | undefined) => {
        onModalOpen('Edit')
        onEditClick()
        fetchOneUser(userId)
    }

    return (
        <div className="flex justify-center">
            <table className="mx-10 border-collapse border border-slate-400">
                <thead>
                    <tr>
                        <th className=" bg-blue-300 py-3 px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 text-xs sm:text-sm lg:text-lg">Profile picture</th>
                        <th className=" bg-blue-300 py-3 px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 text-xs sm:text-sm lg:text-lg">First name</th>
                        <th className=" bg-blue-300 py-3 px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 text-xs sm:text-sm lg:text-lg">Last name</th>
                        <th className=" bg-blue-300 py-3 px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 text-xs sm:text-sm lg:text-lg">Gender</th>
                        <th className=" bg-blue-300 py-3 px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 text-xs sm:text-sm lg:text-lg">Birthday</th>
                        <th className=" bg-blue-300 py-3 px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 text-xs sm:text-sm lg:text-lg">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map((user: User, index: number) => {
                        return (
                            <tr className="hover:bg-gray-200 transition-colors border-collapse border" key={`${user.firstName}${index}`}>
                                <td className="px-0 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-3 text-center text-xs sm:text-sm lg:text-lg"><img className="rounded-full w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24" src={user.image ? user.image : '/placeholder-men.png'} alt={`${user.firstName}${user.lastName}`} /></td>
                                <td className="px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-3 text-center text-xs sm:text-sm lg:text-lg">{user.firstName}</td>
                                <td className="px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-3 text-center text-xs sm:text-sm lg:text-lg">{user.lastName}</td>
                                <td className="px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-3 text-center text-xs sm:text-sm lg:text-lg">{user.gender}</td>
                                <td className="px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-3 text-center text-xs sm:text-sm lg:text-lg">{user.birthday}</td>
                                <td className="px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-3">
                                    <div className="flex items-center gap-3">
                                        <button
                                            className="w-10 lg:w-20 p-1 rounded-md bg-yellow-300 text-xs sm:text-sm lg:text-lg hover:bg-yellow-500 transition-colors"
                                            onClick={() => handleEditClick(user?._id)}
                                        >Edit</button>
                                        <button
                                            className="w-10 sm:w-14 lg:w-20 p-1 rounded-md bg-red-500 text-xs sm:text-sm lg:text-lg hover:bg-red-700 transition-colors"
                                            onClick={() => deleteUserHandler(user?._id)}
                                        >Delete</button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default UserListTable