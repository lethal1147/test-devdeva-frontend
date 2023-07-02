import UserModalForm from "./userModalForm"

function CreateUserModal({
    user,
    onChangeHandler,
    onCancel,
    onImageAdd,
    onCreateUser,
    userImage,
    onRemoveImage,
    isSending
}: CreateUserModalProps) {
    return (
        <form
            onSubmit={onCreateUser}
            className="bg-gray-300 rounded-lg py-3 md:py-6 px-5 md:px-10 flex flex-col gap-5"
        >
            <UserModalForm
                onRemoveImage={onRemoveImage}
                userImage={userImage}
                onImageAdd={onImageAdd}
                onChangeHandler={onChangeHandler}
                user={user}
                head={'Create User'}
                isSending={isSending}
            />
            <div className="flex justify-end gap-5">
                <button
                    disabled={isSending}
                    onClick={onCancel}
                    className="bg-gray-400 w-32 p-2 rounded-lg hover:bg-gray-600 transition-colors"
                >CANCEL</button>
                <button
                    disabled={isSending}
                    type="submit"
                    className={`${isSending ? "bg-gray-500" : "bg-green-500"} w-32 p-2 rounded-lg hover:bg-green-700 transition-colors`}
                >{isSending ? "Sending..." : "CREATE"}</button>
            </div>
        </form>
    )
}

export default CreateUserModal