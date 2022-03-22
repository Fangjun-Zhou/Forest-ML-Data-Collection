import React, { Component, createRef, useRef } from 'react'
import AudioPlayer from 'material-ui-audio-player';
import { Button, FormControlLabel, Grid, RadioGroup, Radio, Typography } from '@mui/material';
import { Box } from '@mui/system';

export default class Question extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionFile: "",
            audioSrc: "/api/time",
            choices: [],
            selection: null,
            index: 0,
        };
        this.onSelect = props.onSelect;
        this.choiceList = createRef();
        this.UpdateList = this.UpdateList.bind(this);
    }

    UpdateList(newChoice, newSelection) {
        console.log(newChoice);
        this.choiceList.current.setState({
            choices: newChoice,
            selection: newSelection
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
                            this.setState({
                                selection: choice
                            });
                            this.onSelect(this.state.index, choice);
                        }}
                        choices={this.state.choices}
                        selection={this.state.selection}>

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
            choices: props.choices,
            selection: props.selection
        }
    }

    render() {
        return (
            <div>
                <RadioGroup>
                    {
                        this.state.choices.map((choice) => (

                            <Grid container key={choice} sx={{ height: 60 }}>

                                <Grid item xs={4}>

                                </Grid>

                                <Grid item xs={4}>

                                    <FormControlLabel
                                        value={choice}
                                        label={"Sample" + choice}
                                        control={<Radio />}
                                        onClick={() => {
                                            this.props.onClick(choice)
                                            this.setState({
                                                selection: choice,
                                            })
                                        }}
                                        checked={choice == this.state.selection}
                                        sx={{ width: "100%" }}>

                                    </FormControlLabel>
                                </Grid>

                                <Grid item xs={4}>

                                </Grid>

                            </Grid>

                        ))
                    }
                </RadioGroup>
            </div>
        )
    }
}