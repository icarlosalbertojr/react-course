import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Container, Owner, Loading, BackButton, IssueList, PageActions, Filters } from "./styles";
import api from "../../services/api";
import { FaArrowLeft } from "react-icons/fa";


export default function Repository () {

    const [repository, setRepository] = useState({});
    const [loading, setLoading] = useState(true);
    
    const [issues, setIssues] = useState([]);
    const [issuePage, setIssuePage] = useState(1);

    const [issueStateFilter] = useState([
        { state: 'all', label: 'Todas' },
        { state: 'open', label: 'Abertas' },
        { state: 'closed', label: 'Fechadas'}
    ]);

    const [issueStateActive, setIssueStateActive] = useState(0);

     

    const { repositoryName } = useParams();

    useEffect(() => {
        async function load () {
            const [repoData, issuesData] = await Promise.all([
                api.get(`/repos/${repositoryName}`),
                api.get(`/repos/${repositoryName}/issues`, {
                    params: {
                        state: issueStateFilter[issueStateActive].state,
                        per_page: 5,
                        page: issuePage
                    }
                })
            ])
            setRepository(repoData.data);
            setIssues(issuesData.data);
            setLoading(false);
        }

        load();

    }, [repositoryName])

    useEffect(() => {
        loadIssue();
    }, [issuePage])

    useEffect(() => {
        setIssuePage(1)
        loadIssue();
    }, [issueStateActive])

    async function loadIssue() {
        const response = await api.get(`/repos/${repositoryName}/issues`, {
            params: {
                state: issueStateFilter[issueStateActive].state,
                per_page: 5,
                page: issuePage
            }
        })

        setIssues(response.data)
    }

    function handlePage(action) {
        switch(action) {
            case 'next':
                setIssuePage(issuePage + 1);
                break;
            case 'back':
                if (issuePage === 1) break;
                setIssuePage(issuePage - 1);
                break;
        }
    }

    if (loading) {
        return (
            <Loading>
                <h1>Carregando...</h1>
            </Loading>
        )
    }

    return (
        <Container>
            <BackButton to="/">
                <FaArrowLeft color="#000" size={30} />
            </BackButton>
            <Owner>
                <img 
                    src={repository.owner.avatar_url}
                    alt={repository.owner.login} 
                />
                <h1>{repository.name}</h1>
                <p>{repository.description}</p>
            </Owner>

            <Filters active={issueStateActive}>
                    {issueStateFilter.map((stateFilter, index) => (
                            <button 
                                type="button"
                                key={stateFilter.label}
                                onClick={() => setIssueStateActive(index)}>
                                    {stateFilter.label}
                            </button>
                        ))
                    }
            </Filters>

            <IssueList>
                {
                    issues.map(issue => (
                        <li key={String(issue.id)}>
                            <img src={issue.user.avatar_url} alt={issue.user.login}/>
                            <div>
                                <strong>
                                    <a href={issue.html_url}>
                                        {issue.title}
                                    </a>
                                    
                                    {
                                        issue.labels.map(label => (
                                            <span key={String(label.id)}>{label.name}</span>
                                        ))
                                    }
                                </strong>
                                <p>{issue.user.login}</p>
                            </div>
                        </li>
                    ))
                }
            </IssueList>

            <PageActions>
                <button 
                    disabled={issuePage === 1}
                    type="button" 
                    onClick={() => handlePage('back')}> Back
                </button>

                <button 
                    type="button" 
                    onClick={() => handlePage('next')}> Next
                </button>
            </PageActions>

        </Container>
    )
}