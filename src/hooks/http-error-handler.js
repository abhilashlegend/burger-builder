import { useState, useEffect } from 'react';

const useHttpErrorHandler = (httpClient) => {
    const [error, setError] = useState(null)

			const reqInterceptor = httpClient.interceptors.request.use(req => {
				// this.setState({ error: null })
				setError(null);
				return req
			}, error => {
				setError(error);
			})

			const resInterceptor = httpClient.interceptors.response.use(res => {
				return res
			}, error => {
				setError(error);
			});

		useEffect(() => {
			return () => {
				httpClient.interceptors.request.eject(reqInterceptor);
				httpClient.interceptors.response.eject(resInterceptor);
			}
		}, [reqInterceptor, resInterceptor, httpClient])	
		

		const errorConfirmedHandler = () => {
			setError(null);
			// this.setState({ error: null });
        }
        
        return [error, errorConfirmedHandler];
}

export default useHttpErrorHandler;