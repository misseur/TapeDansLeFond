import { TextField } from 'material-ui';
import PropTypes from 'prop-types';

const propTypes = {
    label: PropTypes.string.isRequired,
    touched: PropTypes.bool,
    error: PropTypes.any,
    type: PropTypes.string,
    input: PropTypes.object,
};

const FormTextField = ({ label, touched, error, type = 'text', input }) =>
    <TextField
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        type={type}
        {...input}
    />
;

FormTextField.propTypes = propTypes;

export default FormTextField;
