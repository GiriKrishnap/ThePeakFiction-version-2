
function loading() {
    return (
        <div className="flex items-center justify-center min-h-screen p-5 min-w-screen bg-slate-600">

            <div className="flex space-x-2 animate-pulse">
                <div className="w-7 h-16 bg-gray-100 rounded-full"></div>
                <div className="w-7 h-14 bg-gray-100 rounded-full"></div>
                <img src="../assets/logo/webLogo.png" alt="logo" className='w-24 h-240' />
                <div className="w-7 h-14 bg-gray-100 rounded-full"></div>
                <div className="w-7 h-16 bg-gray-100 rounded-full"></div>
            </div>

        </div>
    )
}
export default loading