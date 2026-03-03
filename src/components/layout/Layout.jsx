import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Toaster } from "react-hot-toast";
import { useUIStore } from "../../store/uiStore";

export default function Layout() {
    const { theme } = useUIStore();
    return (
        <div
            className={
                "min-h-screen " +
                (theme === "dark" ? "bg-gray-900" : "bg-gray-50")
            }
        >
            <Navbar />
            <main>
                <Toaster position="top-right" />
                <Outlet />
            </main>
        </div>
    );
}
