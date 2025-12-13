import { Link } from "react-router-dom";
import ylogo from "../assets/logo/youtube_mini_icon.png";
import nlogo from "../assets/logo/note_logo.webp";
import xlogo from "../assets/logo/x-logo/logo-black.png";

export default function Links() {
    return (
        <div>
            <h1 className="section-title text-3xl">Links</h1>

            <ul className="card-list list-none p-0">

                <li className="card-list__item">
                    <Link
                        className="card flex no-underline text-inherit border border-gray-400 m-4 p-4"
                        to="https://x.com/nanndato01"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="card__image w-[200px] h-[150px] mr-3 flex items-center justify-center overflow-hidden">
                            <img
                                src={xlogo}
                                alt="icon"
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>

                        <div className="card__body flex flex-col justify-between">
                            <h3 className="card__title text-3xl py-2 m-0">Twitter(X)</h3>
                            <p className="card__text text-xl my-2">寝る起きたbot</p>
                        </div>
                    </Link>
                </li>

                <li className="card-list__item">
                    <Link
                        className="card flex no-underline text-inherit border border-gray-400 m-4 p-4"
                        to="https://youtube.com/@nanndato01"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="card__image w-[200px] h-[150px] mr-3 flex items-center justify-center overflow-hidden">
                            <img
                                src={ylogo}
                                alt="icon"
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>

                        <div className="card__body flex flex-col justify-between">
                            <h3 className="card__title text-3xl py-2 m-0">Youtube</h3>
                            <p className="card__text text-xl my-2">低頻度</p>
                        </div>
                    </Link>
                </li>

                <li className="card-list__item">
                    <Link
                        className="card flex no-underline text-inherit border border-gray-400 m-4 p-4"
                        to="https://note.com/nanndato01"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <div className="card__image w-[200px] h-[150px] mr-3 flex items-center justify-center overflow-hidden">
                            <img
                                src={nlogo}
                                alt="icon"
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>

                        <div className="card__body flex flex-col justify-between">
                            <h3 className="card__title text-3xl py-2 m-0">note</h3>
                            <p className="card__text text-xl my-2">ほぼ日記</p>
                        </div>
                    </Link>
                </li>

            </ul>
        </div>
    );
}
