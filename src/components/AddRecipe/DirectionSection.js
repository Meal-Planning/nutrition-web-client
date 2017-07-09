// -- Import core React tools
import React from 'react'

class DirectionListItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleDirectionsChange = this.handleDirectionsChange.bind(this);
        this.handleDeleteDirection = this.handleDeleteDirection.bind(this);
    }

    handleDirectionsChange(e) {
        this.props.onDirectionChange(this.props.index, e.target.value);
    }

    handleDeleteDirection(e) {
        this.props.onDirectionDelete(this.props.index);
    }

    render() {
        return (
            <li>
                <textarea value={this.props.direction} onChange={this.handleDirectionsChange}/>
                <button onClick={this.handleDeleteDirection}>X</button>
            </li>
        );
    }
}

class DirectionSection extends React.Component {
    constructor(props) {
        super(props);
        this.handleDirectionsChange = this.handleDirectionsChange.bind(this);
        this.handleNewDirection = this.handleNewDirection.bind(this);
        this.handleDeleteDirection = this.handleDeleteDirection.bind(this);
    }

    handleDirectionsChange(index, value) {
        this.props.onDirectionsChange(index, value);
    }

    handleNewDirection(e) {
        this.props.onDirectionAdded();
    }

    handleDeleteDirection(index) {
        this.props.onDirectionDeleted(index);
    }

    render() {
        var self = this;
        var rows = [];
        this.props.recipe.directions.forEach(function (direction, index) {
            rows.push(<DirectionListItem key={index}
                                         index={index}
                                         direction={direction}
                                         onDirectionChange={self.handleDirectionsChange}
                                         onDirectionDelete={self.handleDeleteDirection} />);
        });
        return (
            <div>
                <h2>Directions Section</h2>
                <ol>
                    {rows}
                </ol>
                <button onClick={this.handleNewDirection}>Add New +</button>
            </div>
        );
    }
}
export default DirectionSection