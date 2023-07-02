import UserModalForm from "./userModalForm"

function EditUserModal({
    user,
    onChangeHandler,
    onCancel,
    onImageAdd,
    userImage,
    onUpdateUser,
    onRemoveImage,
    isSending
}: UpdateUserModalProps) {
    return (
        <form
            onSubmit={onUpdateUser}
            className="bg-gray-300 rounded-lg py-6 px-10 flex flex-col gap-5"
        >
            <UserModalForm
                onRemoveImage={onRemoveImage}
                userImage={userImage}
                onImageAdd={onImageAdd}
                onChangeHandler={onChangeHandler}
                user={user}
                head={'Edit User'}
                isSending={isSending}
            />
            <div className="flex justify-end gap-5">
                <button
                    onClick={onCancel}
                    className="bg-gray-400 w-32 p-2 rounded-lg hover:bg-gray-600 transition-colors"
                >CANCEL
                </button>
                <button
                    disabled={isSending}
                    className={`${isSending ? "bg-gray-500" : "bg-green-500"}  w-32 p-2 rounded-lg hover:bg-green-700 transition-colors`}
                >{isSending ? 'Sending...' : 'SAVE'}
                </button>
            </div>
        </form>
    )
}

export default EditUserModal