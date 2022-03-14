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
        this.choiceList = createRef();
        this.UpdateList = this.UpdateList.bind(this);
    }

    UpdateList(newChoice) {
        console.log(newChoice);
        this.choiceList.current.setState({
            choices: newChoice
        });
    }

    render() {
        return (
            <div>
                <Box sx={{
                    height: "60vh"
                }}>
                    <Grid container>
                        <Grid item xs={2}>

                        </Grid>

                        <Grid item xs={8}>
                            <AudioPlayer
                                src={this.state.audioSrc + this.state.questionFile}
                                rounded={true}
                            />
                        </Grid>

                        <Grid item xs={2}>

                        </Grid>

                    </Grid>

                    <Box sx={{ height: "10%" }}></Box>

                    <ChoiceList
                        ref={this.choiceList}
                        onClick={(choice) => {
                            console.log(choice)
                        }}
                        choices={this.state.choices}>

                    </ChoiceList>

                </Box>
            </div>
        )
    }
}


class ChoiceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choices: props.choices
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.choices.map((choice) => (
                        <Grid container key={choice} sx={{ height: 60 }}>

                            <Grid item xs={4}>

                            </Grid>

                            <Grid item xs={4}>
                                <Button
                                    onClick={() => {
                                        this.props.onClick(choice)
                                    }}
                                    sx={{ width: "100%" }}>
                                    Sample {choice}
                                </Button>
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