const progressBarColor = (value, maxValue) => {
    const percentage = (value / maxValue) * 100;

    if(percentage > 120) {
        return '#a88e18'
    } else if (percentage > 110) {
        return '#a88e18'
    } else {
        return 'var(--primary-color)'
    }
};

export default progressBarColor