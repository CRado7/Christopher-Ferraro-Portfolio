import React from 'react';
import '../styles/Nav.css';

export default function Nav() {
    return (
        <nav>
            <div className="nav-left">
                <h1>Christopher Ferraro</h1>
            </div>
            <div className="nav-right">
                <button>Controls</button>
                <button onClick={() => window.location.href = 'mailto:christopher.ferraro34@gmail.com'}>Contact</button>
            </div>
        </nav>
    );
    }