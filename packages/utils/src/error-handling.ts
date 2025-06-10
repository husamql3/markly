export type Success<T> = {
	data: T;
	error: null;
	isSuccess: true;
	isFailure: false;
};

export type Failure<E> = {
	data: null;
	error: E;
	isSuccess: false;
	isFailure: true;
};

export type Result<T, E = Error> = Success<T> | Failure<E>;

export const isSuccess = <T, E>(result: Result<T, E>): result is Success<T> =>
	result.isSuccess;

export const isFailure = <T, E>(result: Result<T, E>): result is Failure<E> =>
	result.isFailure;

export const map = <T, E, U>(result: Result<T, E>, fn: (data: T) => U): Result<U, E> => {
	if (isSuccess(result)) {
		return { data: fn(result.data), error: null, isSuccess: true, isFailure: false };
	}
	return result;
};

export const mapError = <T, E, F>(
	result: Result<T, E>,
	fn: (error: E) => F,
): Result<T, F> => {
	if (isFailure(result)) {
		return { data: null, error: fn(result.error), isSuccess: false, isFailure: true };
	}
	return result;
};

export async function tryCatch<T, E = Error>(
	fn: () => Promise<T>,
): Promise<Result<T, E>> {
	try {
		const data = await fn();
		return { data, error: null, isSuccess: true, isFailure: false };
	} catch (error) {
		const typedError =
			error instanceof Error ? (error as E) : (new Error(String(error)) as E);
		return { data: null, error: typedError, isSuccess: false, isFailure: true };
	}
}
