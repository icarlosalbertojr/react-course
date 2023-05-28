import { useCallback, useEffect, useState } from "react";
import { Container, Form, SubmitButton, List, DeleteButton } from "./styles";
import { FaBars, FaGithub, FaPlus, FaSpinner, FaTrash } from "react-icons/fa";
import api from "../../services/api";
import { Link } from "react-router-dom";

export default function Home () {

    const [newRepo, setNewRepo] = useState("");
    const [repositories, setRepositories] = useState(JSON.parse(localStorage.getItem("repos")) || []);
    const [loading, setLoading] = useState(false);
    const [isErrorOccured, setIsErrorOccurred] = useState(false);

    useEffect(() => {
    }, [])

    useEffect(()=> {
        localStorage.setItem("repos", JSON.stringify(repositories))
    }, [repositories])


    const handleSubmit = useCallback((e) => {
        
        e.preventDefault();

        async function submit() {
            setLoading(true);
            setIsErrorOccurred(false);
            try {

                if(!newRepo) {
                    throw new Error("Repository name is empty!");
                }

                const hasRepo = repositories.find(repo => repo.name === newRepo);
                if (hasRepo) {
                    throw new Error("Repository already exists!");
                }

                const response = await api.get(`/repos/${newRepo}`);

                const repoFound = {
                    name: response.data.full_name
                }

                setRepositories([...repositories, repoFound])
                setNewRepo("")
            } catch (error) {
                console.error(error);
                setIsErrorOccurred(true);
                setNewRepo("");
            } finally {
                setLoading(false);
            }
        }

        submit();
        localStorage.setItem("repos", JSON.stringify(repositories))

    }, [newRepo, repositories])

    const handleDelete = useCallback((repoName) => {
        const repos = repositories.filter((repo) => repo.name !== repoName)
        setRepositories(repos)
    }, [repositories])

    return (
        <Container>

            <h1>
                <FaGithub size={25} />
                Meus repositórios
            </h1>

            <Form onSubmit={handleSubmit} error={isErrorOccured}>

                <input 
                    type="text"
                    placeholder="Adicionar repositórios"
                    value={newRepo}
                    onChange={(e) => setNewRepo(e.target.value) }
                />

                <SubmitButton loading={loading ? 1 : 0}>
                    { loading ? <FaSpinner color="#FFF" size={14}/> : <FaPlus color="#FFF" size={14}/> }
                </SubmitButton>

            </Form>

            <List>
                {
                    repositories.map(repo => (
                        <li key={repo.name}>
                            <span>
                                <DeleteButton onClick={() => handleDelete(repo.name)}>
                                    <FaTrash size={16}/>
                                </DeleteButton>
                                {repo.name}
                            </span>
                            <Link to={`/repository/${encodeURIComponent(repo.name)}`}>
                                <FaBars size={20} />
                            </Link>
                        </li>
                    ))
                }
            </List>
            
        </Container>
    )
}