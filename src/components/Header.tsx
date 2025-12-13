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
        <header className="header border-b border-gray-400 flex justify-between items-center">
            <div className="header__logo w-[120px] h-[120px] md:w-[250px] md:h-[100px] overflow-hidden">
                <Link to="/">
                    <img className="logo__img" src={logo} alt="website logo"/>
                </Link>
            </div>

            <h1 className="header__title text-2xl font-normal">nanndato01のホームページ</h1>

            <nav className="global-nav hidden md:block">
                <NavLinks />
            </nav>

           <div className="md:hidden">
                <HamburgerMenu NavLists={navLists}/>
           </div>
        </header>
    );
}