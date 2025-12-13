import { Link } from "react-router-dom";

import HamburgerMenu from "./HamburgerMenu";
import logo from "../assets/logo/logo.jpg";
import type { Navitem } from "../types/navitem";

const navLists: Navitem[] = [
    {title: "top", link: "/"},
    {title: "about", link: "/about"},
    {title: "articles", link: "/articles"},
    {title: "links", link: "/links"}
];

function NavLinks() {
    return (
        <ul className="flex flex-col md:flex-row list-none p-0 m-0">
            {navLists.map(item => (
                <li key={item.title} className="text-xl pr-0 md:pr-[30px] md:mr-[30px] md:border-r border-gray-400 capitalize py-2 md:py-0 last:border-0 last:mr-0">
                    <Link to={item.link} className="no-underline text-inherit">{item.title}</Link>
                </li>
            ))}
        </ul>
    );
}

export default function Header() {

    return(
        <header className="header border-b border-gray-400 flex justify-between items-center min-h-[100px]">
            <div className="header__logo mr-2 hidden md:block w-[250px] h-[100px] overflow-hidden">
                <Link to="/">
                    <img className="logo__img" src={logo} alt="website logo"/>
                </Link>
            </div>

            <Link to="/" className="header__title text-2xl font-normal mx-8">nanndato01のホームページ</Link>

            <nav className="global-nav hidden md:block">
                <NavLinks />
            </nav>

           <div className="md:hidden mx-3">
                <HamburgerMenu NavLists={navLists}/>
           </div>
        </header>
    );
}