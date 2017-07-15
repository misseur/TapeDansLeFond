import {
    map,
    split,
    pipe,
    compose,
    fromPairs,
    trim,
    defaultTo,
    join,
    toPairs,
    prop,
    unless,
    isNil,
} from 'ramda';
import { saveJWTToken } from '../client/actions';

export const parse = pipe(
    defaultTo(''),
    split(';'),
    map(compose(map(trim), split('='))),
    fromPairs,
);

export const stringify = compose(join(';'), map(join('=')), toPairs);

export const extractFromRequest = cookieName => ({ headers: { cookie } }) =>
    cookie ? pipe(parse, prop(cookieName))(cookie) : null;

const extractJWTFromCookie = pipe(
    extractFromRequest('jwt'),
    unless(isNil, saveJWTToken),
);

export default req => dispatch =>
    Promise.all([extractJWTFromCookie(req)].filter(Boolean).map(dispatch));
