export default function validateAndGetErrorMessage(schema, value) {
	let errorMessage = null;
	try {
		schema.validateSync(value, { abortEarly: false });
	} catch ({ errors }) {
		errorMessage = errors[0];
	}
	return errorMessage;
}
