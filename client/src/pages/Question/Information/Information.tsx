import React, {useState, useEffect} from "react";
import {Button} from "@mui/material";
import './Information.scss'
import AddIcon from "@mui/icons-material/Add";
import {useHistory, useRouteMatch} from "react-router-dom";


export interface QuestionInfoProps {
    question?: any;
}

const QuestionInfo = (props: QuestionInfoProps) => {

    const history = useHistory();
    // let { path, url } = useRouteMatch()

    const {question} = props

    const {title, description} = question

    return (
        <div className="question-info">
            <div className="title">{title}</div>
            <div className="description">{description}</div>
            <div className="section-title">Suggested solutions</div>
            <div className="toolbar">
                <Button
                    variant="contained"
                    onClick={() => {
                        history.push(`/question/${question._id}/add-solution`)
                    }}>
                    <AddIcon/>
                </Button>
            </div>
        </div>
    );
};

export default QuestionInfo
