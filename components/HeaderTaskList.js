import Reac from 'react'

const HeaderTaskList = props => (
    <div className='trello__header'>
        <div className="trello__header-title" aria-label="W trakcie">{props.title}</div> 
        <div className="trello__header-link"><a href="#">...</a></div>

        <style jsx>{`
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
        `}</style>        
    </div>
)


export default HeaderTaskList