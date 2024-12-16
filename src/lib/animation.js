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


export const noteAnimations = {
    enter: (element) => {
        return anime({
            targets: element,
            opacity: [0, 1],
            translateY: [50, 0],
            scale: [0.9, 1],
            duration: 500,
            easing: 'easeOutElastic(1, .8)'
        });
    },

    exit: (element) => {
        return anime({
            targets: element,
            opacity: [1, 0],
            translateY: [0, -50],
            scale: [1, 0.9],
            duration: 400,
            easing: 'easeInQuad'
        });
    },

    update: (element) => {
        return anime({
            targets: element,
            scale: [1, 1.05, 1],
            duration: 600,
            easing: 'easeInOutQuad'
        });
    }
};
