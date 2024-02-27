document.addEventListener('keypress', (e) => {
    handleEventKey(e.key);
});

window.addEventListener('message', (e) => {
    handleEventKey(e.data);
});