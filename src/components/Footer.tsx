import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div className="bg-gray-50 border-t border-gray-400 text-gray-500 items-center py-[30px] mt-[30px]">
            <div className="text-center mb-[10px]">
                <p>© 2025 nanndato01</p>
            </div>

            <ul className="p-0 m-0 list-none flex justify-center">
                <li className="mx-4 border-b border-black">
                    <Link to="https:/x.com/nanndato01">Twitter (X)</Link>
                </li>
                <li className="mx-4 border-b border-black">
                    <Link to="https:/youtube.com/@nanndato01">Youtube</Link>
                </li>
                <li className="mx-4 border-b border-black">
                    <Link to="https:/note.com/nanndato01">note</Link>
                </li>
            </ul>
        </div>
    )
}