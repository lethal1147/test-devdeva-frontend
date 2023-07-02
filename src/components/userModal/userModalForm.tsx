import { getMinimumDate } from "../../utils/getMinimumDate"

function UserModalForm({
    user,
    head,
    userImage,
    onChangeHandler,
    onImageAdd,
    onRemoveImage,
    isSending
}: UserModalFormProps) {
    return (
        <div className=" py-2 md:py-5 flex gap-10 border-b-2">
            <div className="flex flex-col gap-2 sm:gap-5">
                <img
                    className="rounded-full self-center w-24 sm:w-36 md:w-48 h-24 sm:h-36 md:h-48"
                    src={userImage ? userImage : '/placeholder-men.png'}
                    alt="image placeholder men" />
                <label
                    htmlFor="fileInput"
                    className="text-center w-full bg-green-500 p-1 md:p-2 rounded-lg hover:bg-green-700 transition-colors">
                    <input
                        disabled={isSending}
                        onChange={onImageAdd}
                        name="image"
                        id="fileInput"
                        type='file'
                        hidden accept="image/png, image/jpeg" />
                    <span>Upload Profile Picture</span>
                </label>
                <button
                    disabled={isSending}
                    onClick={(e) => onRemoveImage(e)}
                    className="w-full bg-red-500 p-1 md:p-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                    Delete Picture
                </button>
            </div>
            <div className="flex flex-col justify-center">
                <h3 className="text-lg sm:text-3xl font-bold text-center">{head}</h3>
                <div className="grid grid-cols-2 gap-3 sm:gap-5 justify-center items-end py-10">
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="firstName">First Name</label>
                        <input
                            onChange={onChangeHandler}
                            value={user.firstName}
                            id="firstName"
                            className=" text-xs sm:text-md p-2 rounded-lg"
                            placeholder="Please enter First name"
                            type="text" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            onChange={onChangeHandler}
                            value={user.lastName}
                            id="lastName"
                            className=" text-xs sm:text-md p-2 rounded-lg"
                            placeholder="Please enter Last name"
                            type="text" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="gender">Gender</label>
                        <select
                            onChange={onChangeHandler}
                            value={user.gender}
                            id="gender"
                            className=" text-xs sm:text-md p-2 rounded-lg"
                        >
                            <option value={''} disabled>--Please select Gender</option>
                            <option value={"Male"}>Male</option>
                            <option value={"Female"}>Female</option>
                            <option value={"Prefer not to say"}>Prefer not to say</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="birthday">Birthday</label>
                        <input
                            onChange={onChangeHandler}
                            max={getMinimumDate()}
                            value={user.birthday}
                            id="birthday"
                            className=" text-xs sm:text-md p-2 rounded-lg"
                            type="date" />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default UserModalForm