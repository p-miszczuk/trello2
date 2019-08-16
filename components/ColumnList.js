import React from 'react'
import Task from './Task'

const ColumnList = () => {

    return (
        <div className='trello__wrapper'>
            
            <div className='trello'>
                <div className='trello__header'>
                    <div className="trello__header-title" aria-label="W trakcie">Task Board 1</div> 
                    <div className="trello__header-link"><a href="#">...</a></div>
                </div>
                <div class="trello__list-tasks">
                    <Task />
                </div>
            </div>

            <style jsx>{`
                .trello__wrapper {
                    width: 272px;
                    margin: 0 4px;
                    height: 100%;
                    box-sizing: border-box;
                    display: inline-block;
                    vertical-align: top;
                }
                .trello {
                    background-color: #dfe1e6;
                    border-radius: 4px;
                    display: flex;
                    flex-direction: column;
                    max-height: 100%;
                    position: relative;
                    cursor: pointer;
                }
                .trello__header {
                    display: flex;
                    justify-content: space-between;
                    padding: 10px 8px;
                    width: 100%;
                }
                .trello__header-title {
                    overflow: hidden;
                    word-wrap: break-word;
                    display: block;
                    height: 28px;
                    resize: none;
                    border: none;
                    color: #172b4d;
                    background: transparent;
                    font-weight: 700;
                    padding: 4px 8px;
                    margin: -4px 0;
                    line-height: 20px;
                    cursor: pointer;
                }
                .trello__header-link {
                    display: flex;
                    justify-content: center;
                    width: 30px;
                    height: 25px;
                    margin: -4px;
                }
                .trello__header-link a {
                    text-decoration: none;
                    display: block;
                    font-weight: $baseFontBold;
                    font-size: 16px;
                    letter-spacing: 1px;
                    color: color(HeaderAndAddElemColor);
                    padding: 0px 7px 9px;
                }
                .trello__header-link a:hover {
                    background-color: #c3c7d1;
                    border-radius: 3px;
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
        </div>
    )
}

export default ColumnList