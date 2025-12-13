import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            <main className="flex-1 m-5">
                {children}
            </main>

            <Sidebar />
        </div>
    );
}
