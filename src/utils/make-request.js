// req wrapper
export default function makeRequest(
  [requestHandler, receiveHandler, errorHandler],
  query,
) {
  // Purpose of `modify` parameter is to modify data
  // before passing it to receiveHandler
  // If `modify` is string, the data is simply passed as
  // {[modify]: data}
  // If `modify` is function, the data is passed through it
  // Otherwise, the data is not saved in store
  return async (dispatch, getState, helpers) => {
    dispatch(requestHandler());
    try {
      const response = await helpers.graphqlRequest({
        query,
      });
      if (!response) {
        return dispatch(errorHandler('500 Empty response from server!'));
      }
      if (response.status >= 400) {
        try {
          const errorData = await response.json();
          return dispatch(
            errorHandler(`${errorData.http_status} ${errorData.message}`),
          );
        } catch (error) {
          return dispatch(
            errorHandler(`${response.status} ${response.statusText}`),
          );
        }
      }
      return dispatch(receiveHandler(response));
    } catch (err) {
      return dispatch(errorHandler(err.message));
    }
  };
}
