import anime from "animejs";

export const cardAnimation = (element) => {
    return anime({
        targets: element,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 2000,
        easing: 'easeOutSine'
    });
};

export const cardTitleAnimation = element => {
    return anime({
            targets: element,
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 1200,
            easing: 'easeOutSine'
        }
    )
}