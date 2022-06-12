const exportFunction = () => {
    const text = 'Function from js file invoked'
    if(window)
        alert(text)
    else
        console.log(text)
}