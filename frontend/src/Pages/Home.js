import { Button, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { Component } from 'react'

export default class Home extends Component {
    render() {
        return (
            <div>
                <Box sx={{
                    margin: 0,
                    padding: 0,
                    height: "100vh"
                }}>
                    <Box sx={{
                        height: "30%"
                    }}></Box>

                    <Grid container layout={"horizontal"} columns={12}>
                        <Grid item xs={12}>
                            <Typography variant="h2" align="center">Home</Typography>
                        </Grid>
                    </Grid>

                    <Box sx={{
                        height: "10%"
                    }}></Box>

                    <Grid container layout={"horizontal"} columns={12}>
                        <Grid item xs={4}></Grid>
                        <Grid item xs={4}>
                            <Button sx={{
                                width: "100%"
                            }} variant="contained" href="/questionSet">
                                Sample Question Set
                            </Button>
                        </Grid>
                        <Grid item xs={4}></Grid>
                    </Grid>
                </Box>
            </div>
        )
    }
}
