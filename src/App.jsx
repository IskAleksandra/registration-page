import { useRef, useEffect } from 'react';

import styles from './App.module.css';
import { formValidationSchema } from './validation/schema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const sendData = (formData) => {
	console.log(formData);
};

export const App = () => {
	const buttonRef = useRef(null);

	const {
		register,
		trigger,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
			passcheck: '',
		},
		resolver: yupResolver(formValidationSchema),
		mode: 'onSubmit',
	});

	const emailError = errors.email?.message;
	const passwordError = errors.password?.message;
	const passcheckError = errors.passcheck?.message;

	useEffect(() => {
		const focusSubmitButton = () => {
			if (isValid) {
				buttonRef.current.focus();
			}
		};
		focusSubmitButton();
	}, [isValid]);

	return (
		<div className={styles.app}>
			<form className={styles.form} onSubmit={handleSubmit(sendData)}>
				{emailError && <div className={styles.errorLabel}>{emailError}</div>}

				<input
					type="email"
					name="email"
					placeholder="Введите вашу почту"
					{...register('email')}
					onBlur={() => trigger('email')}
				/>
				{passwordError && (
					<div className={styles.errorLabel}>{passwordError}</div>
				)}
				<input
					type="password"
					name="password"
					placeholder="Введите пароль"
					{...register('password')}
					onBlur={() => trigger('password')}
				/>
				{passcheckError && (
					<div className={styles.errorLabel}>{passcheckError}</div>
				)}
				<input
					type="password"
					name="passcheck"
					placeholder="Повторите пароль"
					{...register('passcheck')}
					onChange={(e) => {
						register('passcheck').onChange(e);
						trigger('passcheck');
					}}
				/>
				<button type="submit" disabled={!isValid} ref={buttonRef}>
					Зарегестрироваться
				</button>
			</form>
		</div>
	);
};
