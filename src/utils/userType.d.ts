import { ChangeEvent, ReactNode } from 'react';

declare global {
  type UserListHeadProps = {
    onAddClick: () => void;
    onModalOpen: React.Dispatch<React.SetStateAction<string>>
  };

  type UserListTableProps = {
    onModalOpen: React.Dispatch<React.SetStateAction<string>>,
    onEditClick: () => void,
    users: User[],
    deleteUserHandler: (userId:string|undefined) => void,
    fetchOneUser: (userId:string|undefined) => void
  }

  type UserPagination = {
    currentPage: number,
    totalPage: number,
    handlerPrevPage: () => void,
    handlerNextPage: () => void,
    handlerPageSelect: (page:number) => void
  }

  type CreateUserModalProps = {
    user: User,
    onChangeHandler: (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => void,
    onCancel: (e?: React.MouseEvent<HTMLButtonElement>) => void,
    onImageAdd: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onCreateUser: (e: FormEvent) => Promise<void>,
    userImage: string | null,
    onRemoveImage: (e: React.MouseEvent<HTMLButtonElement>) => void,
    isSending: boolean
  }

  type UpdateUserModalProps = {
    user: User,
    onChangeHandler: (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => void,
    onCancel: (e?: React.MouseEvent<HTMLButtonElement>) => void,
    onImageAdd: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onUpdateUser: (e: FormEvent) => Promise<void>,
    userImage: string | null,
    onRemoveImage: (e: React.MouseEvent<HTMLButtonElement>) => void,
    isSending: boolean
  }

  type UserModalFormProps = {
    user: User,
    head: string,
    userImage:string | null,
    isSending: boolean,
    onChangeHandler:(e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement>) => void,
    onImageAdd:(e: React.ChangeEvent<HTMLInputElement>) => void,
    onRemoveImage:(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  }

  type ModalProps = {
    isOpen: boolean,
    toggleModal: () => void,
    onBackgroundClick: (e?: React.MouseEvent<HTMLDivElement>) => void,
    children: ReactNode
  }

  type User = {
    firstName: string,
    lastName: string,
    gender: "Male" | "Female" | "Prefer not to say" | "",
    birthday: string,
    image?: string,
    _id?: string,
    id?: number
  }
}