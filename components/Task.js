import React from 'react'

const Task = () => {
    return (
        <a href="#" className="trello__task">
            Task 1

            <style jsx>{`
                .trello__task {
                    background-color: #fff;
                    border-radius: 4px;
                    // box-shadow: 0 1px 0 rgba(9,30,66,.25);
                    display: block;
                    margin-bottom: 8px;
                    max-width: 300px;
                    min-height: 20px;
                    position: relative;
                    text-decoration: none;
                    z-index: 0;
                }
            `}</style>
        </a>
    )
}

export default Task