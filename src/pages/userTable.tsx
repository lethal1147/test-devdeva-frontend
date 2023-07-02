import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import UserListHead from "../components/userlists/userListHead";
import UserListTable from "../components/userlists/userListTable";
import CreateUserModal from "../components/userModal/createUserModal";
import UpdateUserModal from '../components/userModal/editUserModal'
import Modal from "../components/modal";
import Swal from "sweetalert2";
import UserPagination from "../components/userlists/userPagination";

const limit = 5

function UserTable() {
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [modalId, setModalId] = useState<string>('')
    const [userInput, setUserInput] = useState<User>({
        firstName: '',
        lastName: '',
        gender: '',
        birthday: '',
    })
    const [userImage, setUserImage] = useState<File | null>(null)
    const [tempUserImage, setTempUserImage] = useState<string | null>(null)
    const [users, setUsers] = useState<User[] | []>([])
    const [page, setPage] = useState<number>(1)
    const [totalPage, setTotalPage] = useState<number>(1)
    const [isSending, setIsSending] = useState<boolean>(false)

    const backend = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        fetchAllUsersFunction()
    }, [page, totalPage])

    // Handler function
    const toggleModalHandler = (): void => {
        setModalOpen(!modalOpen)
    }

    const closeModalHandler = (e?: React.MouseEvent<HTMLButtonElement | HTMLDivElement>): void => {
        e?.preventDefault()
        setUserInput({
            firstName: '',
            lastName: '',
            gender: '',
            birthday: '',
        })
        setUserImage(null)
        setTempUserImage(null)
        setModalOpen(false)
    }

    const handlerPrevPage = (): void => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handlerNextPage = (): void => {
        if (page < totalPage) {
            setPage(page + 1);
        }
    };

    const handlerPageSelect = (page: number): void => {
        setPage(page)
    }

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        const { id, value } = e.target;
        setUserInput((prev) => ({ ...prev, [id]: value }))
    }

    const handleImageAdd = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedImage = e.target.files[0];
            setUserImage(selectedImage)
            setTempUserImage(URL.createObjectURL(selectedImage));
        }
    };

    const handleImageRemove = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault()
        setUserImage(null)
        setTempUserImage(null)
    }

    const fetchAllUsersFunction = async (): Promise<void> => {
        const data = await axios.get(`${backend}/users`, {
            params: {
                page,
                limit
            }
        }).then(res => res.data)
        const totalPages = Math.ceil(+data.totalDocs / limit)
        setUsers(data.data)
        setTotalPage(totalPages)
    }

    const fetchOneUser = async (userId: string | undefined): Promise<void> => {
        const data = await axios.get(`${backend}/users/${userId}`).then(res => res.data)
        setUserInput(data)
        setUserImage(data.image)
        setTempUserImage(data.image)
    }

    const deleteUserHandler = (userId: string | undefined) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#777',
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire('Deleted!', 'User has been deleted.', 'success')
                try {
                    await axios.delete(`${backend}/users/${userId}`)
                    fetchAllUsersFunction()
                } catch (err) {
                    console.log('Error deleting user:', err)
                }
            }
        })
    }

    const createNewUserHandler = async (e: FormEvent): Promise<void> => {
        e.preventDefault()

        if (!userInput.firstName.trim()) {
            Swal.fire({
                icon: "error",
                title: "First name is required!"
            })
            return
        }
        if (!userInput.lastName.trim()) {
            Swal.fire({
                icon: "error",
                title: "Last name is required!"
            })
            return
        }
        if (!userInput.gender) {
            Swal.fire({
                icon: "error",
                title: "Gender is required!"
            })
            return
        }
        if (!userInput.birthday) {
            Swal.fire({
                icon: "error",
                title: "Birthday is required!"
            })
            return
        }

        Swal.fire({
            title: 'Are you sure?',
            text: "Are you sure to add new user?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: '#22C55E',
            cancelButtonColor: '#d33',
            confirmButtonText: "Yes!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                setIsSending(true)
                const formData = new FormData();
                formData.append('firstName', userInput.firstName)
                formData.append('lastName', userInput.lastName)
                formData.append('gender', userInput.gender)
                formData.append('birthday', userInput.birthday)
                if (userImage) {
                    formData.append('image', userImage);
                }

                try {
                    await axios.post(`${backend}/users`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    fetchAllUsersFunction()
                    closeModalHandler()
                    setIsSending(false)
                    Swal.fire('Succes!', 'Create user succesfully!', 'success')
                } catch (err) {
                    console.log('Error on creating user!', err)
                }
            }
        })
    }

    const updateUserHandler = async (e: FormEvent): Promise<void> => {
        e.preventDefault()
        setIsSending(true)
        const formData = new FormData();
        formData.append('firstName', userInput.firstName)
        formData.append('lastName', userInput.lastName)
        formData.append('gender', userInput.gender)
        formData.append('birthday', userInput.birthday)
        if (userImage) {
            formData.append('image', userImage);
        }
        console.log(userImage)

        try {
            const userId = userInput?._id
            await axios.put(`${backend}/users/${userId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log('Update user succesfully!')
            fetchAllUsersFunction()
            closeModalHandler()
            setIsSending(false)
            Swal.fire('Succes!', 'Update user succesfully!', 'success')
        } catch (err) {
            console.log('Error on updating user!', err)
        }
    }

    return (
        <section>
            <UserListHead
                onModalOpen={setModalId}
                onAddClick={toggleModalHandler} />
            <UserListTable
                fetchOneUser={fetchOneUser}
                deleteUserHandler={deleteUserHandler}
                users={users}
                onModalOpen={setModalId}
                onEditClick={toggleModalHandler} />
            {totalPage > 1 && (
                <UserPagination
                    currentPage={page}
                    totalPage={totalPage}
                    handlerPageSelect={handlerPageSelect}
                    handlerNextPage={handlerNextPage}
                    handlerPrevPage={handlerPrevPage} />)}
            {modalOpen && (
                <Modal
                    isOpen={modalOpen}
                    toggleModal={toggleModalHandler}
                    onBackgroundClick={closeModalHandler}>
                    {modalId === 'Add' ?
                        <CreateUserModal
                            user={userInput}
                            userImage={tempUserImage}
                            onCreateUser={createNewUserHandler}
                            onCancel={closeModalHandler}
                            onChangeHandler={inputChangeHandler}
                            onImageAdd={handleImageAdd}
                            onRemoveImage={handleImageRemove}
                            isSending={isSending}
                        /> :
                        <UpdateUserModal
                            userImage={tempUserImage}
                            onCancel={closeModalHandler}
                            onUpdateUser={updateUserHandler}
                            onChangeHandler={inputChangeHandler}
                            user={userInput}
                            onImageAdd={handleImageAdd}
                            onRemoveImage={handleImageRemove}
                            isSending={isSending}
                        />}
                </Modal>)}
        </section>
    )
}

export default UserTable;