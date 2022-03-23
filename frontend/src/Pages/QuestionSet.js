import { Box, Button, Typography, Grid } from '@mui/material'
import React, { Component, createRef } from 'react'
import Question from './Question';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@emotion/react';

const theme = createTheme({
    status: {
        danger: '#e53e3e',
    },
    palette: {
        primary: {
            main: '#7cb342',
            darker: '#4b830d',
        },
        secondary: {
            main: '#f9a825',
            darker: '#c17900',
        },
        neutral: {
            main: '#64748B',
            contrastText: '#fff',
        },
    },
});

export default class QuestionSet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slection: [],
            questions: [],
            uuid: "",
            currentIndx: 0,
            buttonState: {
                prev: true,
                next: false
            }
        };
        this.UpdateQuestion = this.UpdateQuestion.bind(this);
        this.UpdateCurrQuestion = this.UpdateCurrQuestion.bind(this);
        this.UpdateButtonState = this.UpdateButtonState.bind(this);
        this.NextQuestion = this.NextQuestion.bind(this);
        this.PrevQuestion = this.PrevQuestion.bind(this);
        this.Submit = this.Submit.bind(this);
        this.UpdateQuestion();

        this.currQuestion = createRef();
    }

    UpdateQuestion() {
        fetch("/api/questionSet")
            .then(res => res.json())
            .then((res) => {
                console.log(res);
                this.setState({
                    questions: res.questions,
                    selection: Array.apply(null, Array(5)),
                    uuid: res.uuid
                })
            }).then((res) => {
                this.UpdateCurrQuestion(this.state.currentIndx);
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

    UpdateCurrQuestion(index) {
        console.log(this.state.questions[index].options);
        this.currQuestion.current.setState({
            audioSrc: "/api/audio?name=",
            questionFile: this.state.questions[index].audio,
            options: this.state.questions[index].options,
            selection: this.state.selection[index],
            index: index,
        })
        this.currQuestion.current.UpdateList(this.state.questions[index].options, this.state.selection[index]);
    }

    NextQuestion() {
        var oldIndex = this.state.currentIndx;
        if (oldIndex < this.state.questions.length - 1) {
            this.setState({
                currentIndx: oldIndex + 1
            })

            this.UpdateButtonState(oldIndex + 1);
            this.UpdateCurrQuestion(oldIndex + 1);
        }
    }

    PrevQuestion() {
        var oldIndex = this.state.currentIndx;
        if (oldIndex > 0) {
            this.setState({
                currentIndx: oldIndex - 1
            })

            this.UpdateButtonState(oldIndex - 1);
            this.UpdateCurrQuestion(oldIndex - 1);
        }
    }

    Submit() {
        console.log("Submit.");
        var data = {
            uuid: this.state.uuid,
            questions: this.state.questions,
            answers: this.state.selection,
        };
        console.log(data);
        fetch("/api/submitQuestionSet", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(res => {
            console.log("Request complete! response:", res);
        });
    }

    render() {
        return (
            <div>
                <ThemeProvider theme={theme}>
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
                            <Question
                                ref={this.currQuestion}
                                onSelect={(index, selection) => {
                                    console.log("Changed" + index + "to" + selection);
                                    this.state.selection[index] = selection;
                                }}></Question>
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
                                        disabled={this.state.buttonState.prev}
                                        color="secondary">
                                        Previous
                                    </Button>
                                </Grid>

                                <Grid item xs={4}>

                                </Grid>

                                <Grid item xs={3}>
                                    {this.state.currentIndx < this.state.questions.length - 1 &&
                                        <Button
                                            variant="contained"
                                            sx={{ width: "100%" }}
                                            onClick={this.NextQuestion}
                                            disabled={this.state.buttonState.next}
                                            color="secondary">
                                            Next
                                        </Button>
                                    }
                                    {this.state.currentIndx == this.state.questions.length - 1 &&
                                        <Button
                                            variant="contained"
                                            sx={{
                                                width: "100%"
                                            }}
                                            onClick={this.Submit}
                                            color="primary">
                                            Submit
                                        </Button>
                                    }
                                </Grid>

                                <Grid item xs={1}>

                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </ThemeProvider>
            </div >
        )
    }
}


