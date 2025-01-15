import { Link } from "react-router-dom"
const Error = () => {
    return (
        <h1 className="display-6 m-5 text-center lh-lg">We can't find the page you are looking for. <br />😔 <br />
            <Link to="/" className="text-decoration-none">Go back to home</Link></h1>
    )
}

export default Error
