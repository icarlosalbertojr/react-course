import { useParams } from "react-router-dom"

export default function Repository () {

    const { repositoryName } = useParams();

    return (
        <div>
            { repositoryName }
        </div>
    )
}