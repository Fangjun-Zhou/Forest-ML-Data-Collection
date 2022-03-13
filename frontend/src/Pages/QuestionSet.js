import { Box, Typography } from '@mui/material'
import React, { Component } from 'react'

export default class QuestionSet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audioSrc: "/api/time",
            questions: [],
            uuid: ""
        };
        this.UpdateQuestion = this.UpdateQuestion.bind(this);
        this.UpdateQuestion();
    }

    UpdateQuestion() {
        fetch("/api/questionSet")
            .then(res => res.json())
            .then((res) => {
                console.log(res);
                this.setState({
                    questions: res.questions,
                    uuid: res.uuid
                })
            });
    }

    render() {
        return (
            <div>
                <Box sx={{
                    height: "100vh"
                }}>

                    <Box sx={{ height: "10%" }}></Box>

                    <Typography variant='h2' align='center'>Question Set</Typography>

                    <Box sx={{ height: "10%" }}></Box>

                    <Box sx={{

                    }}>
                        <Typography>Hello</Typography>
                    </Box>

                    <Box sx={{
                        position: "fixed",
                        bottom: 0,
                        width: "100%",
                        height: "10%"
                    }}></Box>
                </Box>
            </div>
        )
    }
}
