import { Box, Button, Typography, Grid } from '@mui/material'
import React, { Component } from 'react'

export default class QuestionSet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            audioSrc: "/api/time",
            questions: [],
            uuid: "",
            currentIndx: 0,
            buttonState: {
                prev: true,
                next: false
            }
        };
        this.UpdateQuestion = this.UpdateQuestion.bind(this);
        this.UpdateButtonState = this.UpdateButtonState.bind(this);
        this.NextQuestion = this.NextQuestion.bind(this);
        this.PrevQuestion = this.PrevQuestion.bind(this);
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

    UpdateButtonState(newIndex) {
        if (newIndex == 0) {
            this.setState({
                buttonState: {
                    prev: true,
                    next: false
                }
            });
        } else if (newIndex == this.state.questions.length - 1) {
            this.setState({
                buttonState: {
                    prev: false,
                    next: true
                }
            });
        } else {
            this.setState({
                buttonState: {
                    prev: false,
                    next: false
                }
            });
        }
    }

    NextQuestion() {
        console.log(this.state.questions.length);
        var oldIndex = this.state.currentIndx;
        if (oldIndex < this.state.questions.length - 1) {
            this.setState({
                currentIndx: oldIndex + 1
            })
        }

        this.UpdateButtonState(oldIndex + 1);
    }

    PrevQuestion() {
        console.log(this.state.questions.length);
        var oldIndex = this.state.currentIndx;
        if (oldIndex > 0) {
            this.setState({
                currentIndx: oldIndex - 1
            })
        }

        this.UpdateButtonState(oldIndex - 1);
    }

    render() {
        return (
            <div>
                <Box sx={{
                    height: "100vh"
                }}>

                    <Box sx={{ height: "10%" }}></Box>

                    <Typography variant='h2' align='center'>
                        Question {this.state.currentIndx + 1}
                    </Typography>

                    <Box sx={{ height: "10%" }}></Box>

                    <Box sx={{
                        display: "flex",
                        flexFlow: "column",
                        height: "auto",
                    }}>
                        <Typography align='center'>Content</Typography>
                    </Box>

                    <Box sx={{
                        position: "fixed",
                        bottom: 0,
                        width: "100%",
                        height: "10%"
                    }}>
                        <Grid container>
                            <Grid item xs={1}>

                            </Grid>

                            <Grid item xs={3}>
                                <Button
                                    variant="contained"
                                    sx={{ width: "100%" }}
                                    onClick={this.PrevQuestion}
                                    disabled={this.state.buttonState.prev}>
                                    Previous
                                </Button>
                            </Grid>

                            <Grid item xs={4}>

                            </Grid>

                            <Grid item xs={3}>
                                <Button
                                    variant="contained"
                                    sx={{ width: "100%" }}
                                    onClick={this.NextQuestion}
                                    disabled={this.state.buttonState.next}>
                                    Next
                                </Button>
                            </Grid>

                            <Grid item xs={1}>

                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </div >
        )
    }
}
