export default function footer() {

    //.........................................................................

    return (
        < footer className="bg-white shadow dark:bg-gray-800" >
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <p className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <img src="/assets/logo/webLogo.png" className="h-12 mt-3 hover:animate-bounce" alt="ThePeakFiction Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ThePeakFiction</span>
                    </p>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <p className="hover:underline cursor-pointer me-4 md:me-6" onClick={() => document.getElementById('my_modal_1').showModal()}>About</p>
                            <dialog id="my_modal_1" className="modal rounded-2xl w-1/2">
                                <div className="modal-box p-5 bg-gray-600">
                                    <h1 className="font-bold text-2xl text-white">About</h1>
                                    <p className="py-4 text-white">Welcome to ThePeakFiction! We're dedicated to creating a vibrant community
                                        for readers and writers. Our mission is to provide a user-friendly platform where you can discover, read,
                                        and share captivating novels from various genres</p> <br />
                                    <h3 className="font-bold text-gray-400 mb-5">Join us on ThePeakFiction and embark on a literary journey!</h3>
                                    <div className="modal-action">
                                        <form method="dialog">
                                            {/* if there is a button in form, it will close the modal */}
                                            <button className="btn w-full bg-blue-600 text-white p-2 rounded-lg">Close</button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>
                        </li>

                        <li>
                            <p className="hover:underline cursor-pointer me-4 md:me-6" onClick={() => document.getElementById('my_modal_2').showModal()}>Privacy Policy</p>
                            <dialog id="my_modal_2" className="modal rounded-2xl w-1/2">
                                <div className="modal-box p-5 bg-gray-600">
                                    <h1 className="font-bold text-2xl text-white">Privacy Policy</h1>
                                    <p className="py-4 text-white">This Privacy Policy describes how we collects, uses, and shares
                                        information when you use the "Service".</p> <br />
                                    <h1 className="font-bold text-lg text-white">Information We Collect:</h1>
                                    <p className=" mt-5 text-white">Personal Information: <br />
                                        When you register for an account, we may collect personal information such as your name, email address, and other optional profile information.</p>
                                    <p className="mt-3 text-white">Uploaded Content: <br />
                                        We collect the novels and other content you upload to the Service.</p>
                                    <p className="mt-3 text-white">Usage Data: <br />
                                        We may collect information about your usage of the Service, including pages visited, interactions, and other usage patterns.</p>

                                    <div className="modal-action">
                                        <form method="dialog">
                                            {/* if there is a button in form, it will close the modal */}
                                            <button className="btn w-full bg-blue-600 text-white mt-6 p-2 rounded-lg">Close</button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>

                        </li>
                        <li>
                            <p className="hover:underline cursor-pointer">Contact</p>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 Made By an Crazy Reader.</span>
            </div>
        </footer >

    )
}
//.........................................................................
