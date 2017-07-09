import { Component } from "react";
import { white, lightBlue300 } from "material-ui/styles/colors";
import autobind from 'autobind-decorator';

class Dashboard extends Component {
    render() {
        console.log(this.props);
        return (
            <div>
                DASHBOARD
            </div>
        );
    }
}

export default autobind(Dashboard);
