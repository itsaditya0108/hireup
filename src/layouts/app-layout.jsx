import { Outlet } from "react-router-dom"
import Header from "../components/header"

const AppLayout = () => {
    return (
        <div className="relative min-h-screen px-6">
            <div className="grid-background fixed top-0 left-0 w-full h-full -z-10"></div>

            <main className="min-h-screen container mx-auto px-4">
                <Header />
                <Outlet />
            </main>

            <footer className="p-10 text-center bg-gray-800 text-white mt-10">
                Made with 💗 by Aditya
            </footer>
        </div>
    )
}

export default AppLayout
