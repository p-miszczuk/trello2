import React from 'react'

const NewTaskCreator = () => {
    return (
        <a href="#" className="trello__add">
            <span>Dodaj kolejną kartę</span>

            <style jsx>{`
                .trello__add {
                    display: block;
                    padding: 8px 8px 10px;
                    position: relative;
                    padding-left: 28px;
                    text-decoration: none;
                }
                .trello__add:hover {
                    color: #172b4d;
                    text-decoration: underline;
                    border-bottom-left-radius: 3px;
                    border-bottom-right-radius: 3px;
                    background-color: #c3c7d1;
                }
                .trello__add span {
                    color: #6b778c;
                }
                .trello__add span:before{
                    content: "+";
                    position: absolute;
                    top:  4px;
                    left: 8px;
                    font-size: 22px;
                }
                .trello__list-tasks {
                    display: block;
                    flex: 1 1 auto;
                    overflow-y: auto;
                    overflow-x: hidden;
                    word-wrap: break-word;
                    padding: 0 8px;
                    min-height: 0;
                }
            `}</style>
        </a>
    )
}

export default NewTaskCreator