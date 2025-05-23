import * as yup from 'yup';

export const formValidationSchema = yup.object().shape({
	email: yup
		.string()
		.matches(
			/^[\w@.]*$/,
			'Email введен не верно, используйте только буквы, цифры и нижнее подчеркивание',
		)
		.max(20, 'Email должен содержать не больше 20 символов.'),
	password: yup
		.string()
		.matches(
			/^[\w@.]*$/,
			'Пароль введен не верно.Доступные символы- буквы, цифры,точка, @.',
		)
		.max(10, 'Пароль не может содержать больше чем 10 символов.')
		.min(3, 'Пароль не может содержать меньше 3 символов'),

	passcheck: yup.string().oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
});
