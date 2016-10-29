import { List, Map } from 'immutable';
import moment from 'moment';

const uid = () => Math.random().toString(34).slice(2);
const now = () => moment().format('YYYY-MM-DD HH:MM:ss');

const ADD_LOG = 'ADD_LOG'
const CLEAR_LOGS = 'CLEAR_LOGS'

const log = (text) => ( { type: ADD_LOG, payload: { id: uid(), text: text, date: now() } } )
const clearLogs = () => ( { type: CLEAR_LOGS } )

export const mapStateToProps = (state) => ( { logs: state } )
export const mapDispatchToProps = (dispatch) => ({
	log: (text) => dispatch(log(text)),
	clearLogs: () => dispatch(clearLogs())
})

const init = List([]);

export function reducer(logs=init, action) {
	switch(action.type) {
	    case ADD_LOG: return logs.push(Map(action.payload));
	    case CLEAR_LOGS: return init;
	    default: return logs;
	}
}