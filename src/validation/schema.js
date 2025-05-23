import * as yup from 'yup';

export const EmailValidationSchema = yup
	.string()
	.matches(
		/^[\w@.]*$/,
		'Email введен не верно, используйте только буквы, цифры и нижнее подчеркивание',
	)
	.max(20, 'Email должен содержать не больше 20 символов.');

export const PasswordValidationSchema = yup
	.string()
	.matches(
		/^[\w@.]*$/,
		'Пароль введен не верно.Доступные символы- буквы, цифры,точка, @.',
	)
	.max(10, 'Пароль не может содержать больше чем 10 символов.');

export const PasswordBluerSchema = yup
	.string()
	.min(3, 'Пароль не может содержать меньше 3 символов');
