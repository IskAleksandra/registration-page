import { useState } from 'react';
import styles from './App.module.css';

const initialState = {
	email: '',
	password: '',
	passcheck: '',
};

const useStore = () => {
	const [state, setState] = useState(initialState);

	return {
		getState: () => state,
		updateState: (fieldName, newValue) => {
			setState({ ...state, [fieldName]: newValue });
		},
	};
};

const sendData = (formData) => {
	console.log(formData);
};

export const App = () => {
	const { getState, updateState } = useStore();

	const onSubmit = (event) => {
		event.preventDefault();
		sendData(getState());
	};

	const { email, password, passcheck } = useStore();

	return (
		<div className={styles.app}>
			<form onSubmit={onSubmit}>
				<input
					type="email"
					name="email"
					value={email}
					placeholder="Введите вашу почту"
					onChange={({ target }) => updateState('email', target.value)}
				/>
				<input
					type="password"
					name="password"
					value={password}
					placeholder="Введите пароль"
					onChange={({ target }) => updateState('password', target.value)}
				/>
				<input
					type="password"
					name="passcheck"
					value={passcheck}
					placeholder="Повторите пароль"
					onChange={({ target }) => updateState('passcheck', target.value)}
				/>
				<button type="submit">Зарегестрироваться</button>
			</form>
		</div>
	);
};

export default App;
