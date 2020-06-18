export const getUser = (): object => {
  return {};
};

export const updateUser = (userId: string, data: object) => {
  const url = process.env.REACT_APP_API_URL + '/Users/' + userId;
  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => {
    if (!response.ok) {
      console.debug(response);
      throw new Error('Bad response from API: ' + response.statusText);
    }

    // TODO
    console.log("Successfully updated: " + response);
  })
  .catch(error => {
    console.error('Problem with your fetch operation:', error);
  });
};

export const createuser = () => {

};

export const deleteUser = () => {

};
