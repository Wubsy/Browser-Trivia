window.onload = async () => {
    await getAPIData(localStorage.getItem('triviaKey'))
}