import React, { Component, createRef, useRef } from 'react'
import AudioPlayer from 'material-ui-audio-player';
import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';

export default class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionFile: "",
            audioSrc: "/api/time",
            choices: [],
        };
        this.UpdateQuestion = this.UpdateQuestion.bind(this);
        this.UpdateQuestion();
        this.choiceList = createRef();
        this.audioPlayer = createRef();
    }

    UpdateQuestion() {
        fetch("/api/randQuestion")
            .then(res => res.json())
            .then((res) => {
                console.log(res);
                this.setState({
                    audioSrc: "/api/audio?name=",
                    questionFile: res.audio,
                    choices: res.choices
                });
                this.choiceList.current.setState({
                    choices: res.choices
                });
            });
    }

    render() {
        return (
            <div>
                <Box sx={{
                    height: "100vh"
                }}>
                    <Box sx={{ height: "10%" }}></Box>

                    <Typography variant='h2' align='center'>Question</Typography>

                    <Box sx={{ height: "10%" }}></Box>

                    <Grid container>
                        <Grid item xs={1}>

                        </Grid>

                        <Grid item xs={8}>
                            <AudioPlayer
                                ref={this.audioPlayer}
                                src={this.state.audioSrc + this.state.questionFile}
                                rounded={true}
                            />
                        </Grid>

                        <Grid item xs={2}>
                            <Button onClick={this.UpdateQuestion}>Update Question</Button>
                        </Grid>

                        <Grid item xs={1}>

                        </Grid>

                    </Grid>

                    <Box sx={{ height: "10%" }}></Box>

                    <ChoiceList ref={this.choiceList} onClick={() => {
                        this.UpdateQuestion();
                    }}></ChoiceList>

                </Box>
            </div>
        )
    }
}


class ChoiceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choices: []
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.choices.map((choice) => (
                        <Grid container>

                            <Grid item xs={4}>

                            </Grid>

                            <Grid item xs={4}>
                                <Button onClick={this.props.onClick} sx={{ width: "100%" }}>Sample {choice}</Button>
                            </Grid>

                            <Grid item xs={4}>

                            </Grid>

                        </Grid>
                    ))
                }
            </div>
        )
    }
}