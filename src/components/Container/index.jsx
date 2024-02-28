export default function Container({ children }) {
    return (
        <div className="w-[100vw] h-[100vh]
                        flex flex-col justify-center items-center
                        bg-gray-500 ">
            <h1 className="font-mono font-bold text-5xl">To-Do List</h1>
            {children}
        </div>
    )
}