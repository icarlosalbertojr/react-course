import { styled } from "styled-components";
import { Link } from "react-router-dom";


export const Loading = styled.div`
    color: #FFF;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
`

export const Container = styled.div`
    max-width: 700px;
    background: #FFF;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    padding: 30px;
    margin: 80px auto;
`

export const Owner = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: 150px;
        border-radius: 20%;
        margin: 20px 0;
    }

    h1 {
        font-size: 30px;
        color: #0D2636;
    }

    p {
        margin-top: 5px;
        font-size: 14px;
        color: #000;
        text-align: center;
        line-height: 1.4;
        max-width: 400px;
    }
`

export const BackButton = styled(Link)`
    background: transparent;
    border: 0;
    outline: 0;

`
export const Filters = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 30px;

        button {
            outline: 0;
            border: 0;
            color: #000;
            padding: 8px;
            border-radius: 4px;

            & + button {
                margin-left: 7px;
            }

            &:nth-child(${props => props.active + 1}) {
                background-color: #0071DB;
                color: #FFF;
            }
            
    }

`

export const IssueList = styled.ul`
    margin-top: 30px;
    padding-top: 30px;
    border: 1px solid #EEE;
    list-style: none;

    li {
        display: flex;
        padding: 15px 10px;
    }

    & + li {
        margin-top: 12px;
    }

    img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: 2px solid #0D2636;
    }

    div {
        flex: 1;
        margin-left: 12px;

        p {
            margin-top: 10px;
            font-size: 12px;
            color: #000;
        }

    }

    strong {
        font-size: 15px;

        a {
            text-decoration: none;
            color: #222;
            transition: .3s;

            &:hover {
                color: #0071DB;
            }

        }

        span {
            background: #222;
            color: #FFF;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 600;
            padding: 5px 7px;
            margin-left: 10px;
        }

    }

`

export const PageActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 30px 0;

    button {
        outline: 0;
        border: 0;
        background-color: #222;
        color: #FFF;
        padding: 8px;
        border-radius: 4px;

        &:disabled {
            cursor: not-allowed;
            opacity: .5;
        }

    }

`
