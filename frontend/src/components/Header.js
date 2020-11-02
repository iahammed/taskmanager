import React, { Component } from 'react'
import { NavLink } from "react-router-dom";

class Header extends Component {
    menuToggle() {
        let menu = document.getElementById('menu')
        let burger = document.getElementById('burger')
        let cross = document.getElementById('cross')
        if(menu.classList.contains('hidden')){
            menu.classList.remove('hidden');
            cross.classList.remove('hidden');
            burger.classList.add('hidden');
        } else {
            menu.classList.add('hidden');
            cross.classList.add('hidden');
            burger.classList.remove('hidden');
        }
    }

    render() {
        return (
        
            <div className="border-b md:flex md:items-center md:justify-between p-4 pb-0 shadow-lg md:pb-4">
                <div className="flex items-center justify-between mb-4 md:mb-0">  
                    <h1 className="leading-none text-2xl text-grey-darkest">
                        <NavLink to = '/' className="no-underline text-grey-darkest hover:text-black">
                            Task Manager
                        </NavLink>
                    </h1>
                    <div className="burger px-4 cursor-pointer md:hidden" id = "burger">
                        <svg className = "w-6" fill="none" viewBox ="0 0 24 24" stroke="currentColor" 
                            onClick = { this.menuToggle }>
                            <path  d= "M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </div>
                    <div className="burger hidden px-4 cursor-pointer md:hidden" id = "cross">        
                        <svg className="w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" 
                            onClick = { this.menuToggle }>
                            <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </div>
                <div className="hidden md:block" id ="menu">
                    <ul className="list-reset md:flex md:items-center">
                        <li className="md:ml-4">
                            <NavLink to = "/newtask"
                                className="inline-block bg-transparent hover:bg-green-500 text-green-500 font-semibold hover:text-white py-2 px-4 border border-green-200 hover:border-transparent rounded"
                                onClick = { this.menuToggle }
                            >
                                <div className="px-4 flex justify-end">
                                    <svg className = "w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeWidth="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span className = "ml-2">
                                        Add new
                                    </span>
                                </div>
                            </NavLink>                            
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Header