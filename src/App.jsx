import { useEffect, useState } from 'react';
import styles from './App.module.css';
import * as yup from 'yup';

const EmailValidationSchema = yup
	.string()
	.matches(
		/^[\w@.]*$/,
		'Email введен не верно, используйте только буквы, цифры и нижнее подчеркивание',
	)
	.max(20, 'Email должен содержать не больше 20 символов.');

const passwordValidationSchema = yup
	.string()
	.matches(
		/^[\w@.]*$/,
		'Пароль введен не верно.Доступные символы- буквы, цифры,точка, @.',
	)
	.max(10, 'Пароль не может содержать больше чем 10 символов.');

// const passcheckValidationSchema = yup
// 	.string()
// 	.oneOf([yup.ref('password'), null], 'Пароли не совпадают.');

// const passwordBluerSchema = yup
// 	.string()
// 	.min(3, 'Пароль не может содержать меньше 3 символов');

const validateAndGetErrorMessage = (schema, value) => {
	let errorMessage = null;
	try {
		schema.validateSync(value, { abortEarly: false });
	} catch ({ errors }) {
		errorMessage = errors[0];
	}
	return errorMessage;
};

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
	const [emailError, setEmailError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);
	const [passcheckError, setPasscheckError] = useState(null);
	const [isFormValid, setIsFormValid] = useState(false);

	const { email, password, passcheck } = getState();

	useEffect(() => {
		const validateForm = () => {
			const emailErr = validateAndGetErrorMessage(EmailValidationSchema, email);
			const passwordErr = validateAndGetErrorMessage(
				passwordValidationSchema,
				password,
			);

			setEmailError(emailErr);
			setPasswordError(passwordErr);

			setIsFormValid(!emailErr && !passwordErr);
		};
		validateForm();
	}, [email, password, passcheck]);

	const onSubmit = (event) => {
		event.preventDefault();
		let passcheckErr = null;
		if (password && passcheck) {
			if (password !== passcheck) {
				passcheckErr = 'Пароли не совпадают.';
			}
		}

		setPasscheckError(passcheckErr);
		setIsFormValid(!passcheckErr);

		if (!passcheckErr) {
			sendData(getState());
		}
	};

	return (
		<div className={styles.app}>
			<form className={styles.form} onSubmit={onSubmit}>
				{emailError && <div className={styles.errorLabel}>{emailError}</div>}

				<input
					type="email"
					name="email"
					value={email}
					placeholder="Введите вашу почту"
					onChange={({ target }) => {
						updateState('email', target.value);
					}}
				/>
				{passwordError && (
					<div className={styles.errorLabel}>{passwordError}</div>
				)}
				<input
					type="password"
					name="password"
					value={password}
					placeholder="Введите пароль"
					onChange={({ target }) => {
						updateState('password', target.value);
					}}
				/>
				{passcheckError && (
					<div className={styles.errorLabel}>{passcheckError}</div>
				)}
				<input
					type="password"
					name="passcheck"
					value={passcheck}
					placeholder="Повторите пароль"
					onChange={({ target }) => updateState('passcheck', target.value)}
				/>
				<button type="submit" disabled={!isFormValid}>
					Зарегестрироваться
				</button>
			</form>
		</div>
	);
};
