import anime from "animejs";

export const cardAnimation = (element) => {
    return anime({
        targets: element,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        easing: 'easeOutElastic'
    });
};

export const cardTitleAnimation = element => {
    return anime({
            targets: element,
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 1200,
            easing: 'easeInOutSine'
        }
    )
}