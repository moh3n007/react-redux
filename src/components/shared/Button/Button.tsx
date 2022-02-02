import { FC } from "react"
import "./button.css"

type IButtonProps = {

} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const Button: FC<IButtonProps> = (props) => {

    return (
        <button className="button" {...props} />
    )
}

export default Button