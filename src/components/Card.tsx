import { Link } from "react-router-dom";
import defaultCover from "../assets/cover/default-cover.jpg"

interface CardProps {
    link: string;
    external?: boolean;
    cover?: string | null;
    contain?: boolean;
    title: string;
    excerpt?: string | null;
    tags?: string[] | null;
    author?: string | null;
    published_at?: string | null;
}

export default function Card({link, external = false, cover, contain = false, title, excerpt, tags, author, published_at}: CardProps) {
    const imageClass = contain
    ? "w-full h-full block object-contain"
    : "w-full h-full block object-cover";
    const content = (
        <>
            <div className="w-full aspect-[4/3] md:w-[200px] md:h-[150px] max-h-[200px] mr-0 mb-[10px] md:mr-[10px] md:mb-0 shrink-0 overflow-hidden">
                <img src={cover ?? defaultCover} alt="cover" className={imageClass}/>
            </div>

            <div className="flex flex-col justify-between">
                <h3 className="text-2xl md:text-3xl font-bold md:font-normal py-[10px] px-0 m-0">{title}</h3>
                <p className="text-xl my-[10px] mx-0">{excerpt}</p>

                <div className="flex items-start md:items-center flex-wrap flex-col md:flex-row gap-y-[4px] gap-x-0">
                    <ul className="p-0 m-0 list-none flex flex-wrap">
                        {tags?.map(tag => (
                            <li key={tag}>
                                <object>
                                    <Link to={`/tags/${tag}`} className="card__tag">
                                        <p className="card__tag__title">{tag}</p>
                                    </Link>
                                </object>
                            </li>
                        ))}
                    </ul>

                    <span className="text-gray-400 text-xs">{author ?? ""}{author && published_at ? " / " : ""}{published_at ?? ""}</span>
                </div>
            </div>
        </>
    )
    return (
        <div>
            {external ? (
                <a href={link} target="_blank" rel="noopener noreferrer"
                    className="m-[15px] p-[10px] border border-gray-400 rounded-lg no-underline text-inherit block md:flex"
                >
                    {content}
                </a>
            ) : (
                <Link to={link} className="m-[15px] p-[10px] border border-gray-400 rounded-lg no-underline text-inherit block md:flex">
                    {content}
                </Link>
            )}
        </div>
    )
}