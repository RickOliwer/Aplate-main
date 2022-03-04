import axios from "axios";
import isEmpty from "lodash.isempty";
import { useRouter } from "next/router";
import { useState } from "react";
import Client from "../src/apollo/client";
import { GET_PAGE } from "../src/queries/pages/get-page";
import { sanitize } from "../src/utils/miscellaneous";
import { getPreviewRedirectUrl } from "../src/utils/redirects";
import validateAndSanitizeLoginForm from "../src/utils/validator/login";

const Login = ( { data } ) => {
	const router = useRouter();
	const [ loginFields, setLoginFields ] = useState( {
		username: '',
		password: '',
	} );

	const [ errorMessage, setErrorMessage ] = useState( null );
	const [ loading, setLoading ] = useState( false );

	const onFormSubmit = ( event ) => {
		event.preventDefault();
		setErrorMessage( null );
		const {postType, previewPostId} = router?.query ?? {};

		// Validation and Sanitization.
		const validationResult = validateAndSanitizeLoginForm( {
			username: loginFields?.username ?? '',
			password: loginFields?.password ?? '',
		} );

		if ( validationResult.isValid ) {
			setLoading( true );
			return axios( {
				data: {
					username: validationResult?.sanitizedData?.username ?? '',
					password: validationResult?.sanitizedData?.password ?? '',
				},
				method: 'post',
				url: '/api/login'
			} )
				.then( ( data ) => {
					setLoading( false );
					const {success} = data?.data ?? {};

					// If its a preview request
					if ( success && postType && previewPostId ) {
						const previewUrl = getPreviewRedirectUrl( postType, previewPostId );
						router.push( previewUrl );
					}
					return data?.data?.success;
				} )
				.catch( () => {
					setLoading( false );
					return false;
				} );
		} else {
			setClientSideError( validationResult );
		}
	};

	/**
     * Sets client side error.
     *
     * Sets error data to result received from our client side validation function,
     * and statusbar to true so that its visible to show the error.
     *
     * @param {Object} validationResult Validation Data result.
     */
	const setClientSideError = ( validationResult ) => {
		if ( validationResult.errors.password ) {
			setErrorMessage( validationResult.errors.password );
		}

		if ( validationResult.errors.username ) {
			setErrorMessage( validationResult.errors.username );
		}
	};

	const handleOnChange = ( event ) => {
		setLoginFields( { ...loginFields, [event.target.name]: event.target.value } );
	};

	const { username, password } = loginFields;
	return (
		<>
			<div className="w-5/12 p-8 m-auto mt-10 bg-gray-100 rounded-lg login-form md:ml-auto md:mt-12">
				<h4 className="block mb-5 text-lg font-medium text-gray-900 title-font">Login</h4>
				{! isEmpty( errorMessage ) && (
					<div
						className="text-red-600"
						dangerouslySetInnerHTML={{ __html: sanitize( errorMessage ) }}
					/>
				)}
				<form onSubmit={onFormSubmit} className="mb-4">
					<label className="text-sm leading-7 text-gray-600">
                    Username:
						<input
							type="text"
							className="w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
							name="username"
							value={username}
							onChange={handleOnChange}
						/>
					</label>
					<br />
					<label className="text-sm leading-7 text-gray-600">
                    Password:
						<input
							type="password"
							className="w-full px-3 py-1 mb-8 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-white border border-gray-300 rounded outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
							name="password"
							value={password}
							onChange={handleOnChange}
						/>
					</label>
					<button className="px-8 py-2 text-lg text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600" type="submit">
                    Login
					</button>
					{loading ? <p>Loading...</p> : null  }
				</form>
			</div>
		</>
	);
};
export default Login;

export async function getStaticProps( context ) {

	const { data, errors } = await Client.query( {
		query: GET_PAGE,
		variables: {
			uri: '/',
		},
	} );

	return {
		props: {
			data: data || {}
		},
		/**
         * Revalidate means that if a new request comes to server, then every 1 sec it will check
         * if the data is changed, if it is changed then it will update the
         * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
         */
		revalidate: 1,
	};

}