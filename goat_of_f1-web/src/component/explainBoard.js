import { fontFamily } from "@mui/system";
import settings from '../settings'

export default function explainBoard(title, descriptions) {
    return (
        <div
            className="explanation-board" 
            style={{ 
                fontFamily: settings.Font.major
            }}
            href="default.asp"
        >
            <h3 style={{color: settings.Colors.mainColor}}>{title}</h3>
            {descriptions.map((row) => {
                return (<div>{row}</div>) 
            })}
        </div>
    )
}