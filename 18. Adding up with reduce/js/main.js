/* ==================== Tally up with reduce  ==================== */
const countTime = {
    config: {
        $time: Array.from(document.querySelectorAll('.videos [data-time]')) //transform nodeList to array
    },

    /* ==================== functionality ==================== */

    seconds: function() {
      const timeNodes = this.config.$time
      const seconds = timeNodes
        .map(node => node.dataset.time)
        .map(timeCode => {
            const [mins, secs] = timeCode.split(':').map(parseFloat);
            return (mins * 60) + secs;
        })
        .reduce((total, vidSeconds) => total + vidSeconds);
        let secondsLeft = seconds;
        const hours = Math.floor(secondsLeft / 3600);
        secondsLeft = secondsLeft % 3600;

        const mins = Math.floor(secondsLeft / 60);
        secondsLeft = secondsLeft % 60;

        console.log(hours, mins, secondsLeft);
    },

    /* ==================== Initialize ==================== */
    initialize: function() {
        this.seconds();
    }
}
countTime.initialize();
