import {
    COMPANY_CREATING,
    COMPANY_CREATE_SUCCESS,
    COMPANY_CREATE_ERROR,
    COMPANY_REQUESTING_ONE,
    COMPANY_REQUEST_ONE_SUCCESS,
    COMPANY_REQUEST_ONE_ERROR,
    COMPANY_REQUESTING_ALL,
    COMPANY_REQUEST_ALL_SUCCESS,
    COMPANY_REQUEST_ALL_ERROR,
    COMPANY_INVITATION_EMAIL,
    COMPANY_INVITATION_EMAIL_SUCCESS,
    COMPANY_INVITATION_EMAIL_ERROR,
} from './constants';

export const companyCreate = (client, user, company) => ({
    type: COMPANY_CREATING,
    client,
    user,
    company,
});

export const companyCreateSuccess = (company, user) => ({
    type: COMPANY_CREATE_SUCCESS,
    company,
    user,
});

export const companyCreateError = error => ({
    type: COMPANY_CREATE_ERROR,
    error,
});

export const companyRequestOne = client => ({
    type: COMPANY_REQUESTING_ONE,
    client,
});

export const companyRequestOneSuccess = company => ({
    type: COMPANY_REQUEST_ONE_SUCCESS,
    company,
});

export const companyRequestOneError = error => ({
    type: COMPANY_REQUEST_ONE_ERROR,
    error,
});

export const companyRequestAll = client => ({
    type: COMPANY_REQUESTING_ALL,
    client,
});

export const companyRequestAllSuccess = companies => ({
    type: COMPANY_REQUEST_ALL_SUCCESS,
    companies,
});

export const companyRequestAllError = error => ({
    type: COMPANY_REQUEST_ALL_ERROR,
    error,
});

export const companyEmail = (client, email) => ({
    type: COMPANY_INVITATION_EMAIL,
    client,
    email,
});

export const companyEmailSuccess = () => ({
    type: COMPANY_INVITATION_EMAIL_SUCCESS,
});

export const companyEmailError = error => ({
    type: COMPANY_INVITATION_EMAIL_ERROR,
    error,
});
