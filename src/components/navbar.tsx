import 'tailwindcss/tailwind.css';

function Navbar() {
    return (
        <nav className='py-3 px-10 flex bg-blue-300 items-center justify-between'>
            <h3 className='sm:text-3xl font-bold'>User Management</h3>
            <div className='bg-gray-200 rounded-full'>
                <img
                    className='p-2'
                    src="/D.png"
                    width={50}
                    height={50}
                    alt={'D logo'}
                />
            </div>
        </nav>
    )
}

export default Navbar