import { TextField } from 'material-ui';
import Popup from '../common/Popup';

const LoginPopup = ({ ...props }) =>
    <Popup {...props}>
        <TextField floatingLabelText="Nom d'utilisateur" />
        <TextField floatingLabelText="Mot de passe" />
    </Popup>
;

export default LoginPopup;
