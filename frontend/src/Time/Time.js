import React from 'react'

export default class Time extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        }
    }

    UpdateTime() {
        fetch("/api/time")
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({
                    value: res
                });
            })
    }

    render() {
        return (
            <div>{this.state.value}</div>
        )
    }
}