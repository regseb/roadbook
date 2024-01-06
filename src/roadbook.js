/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

const shiftDistance = (steps) => {
    return steps
        .reverse()
        .map((step, index, steps2) => ({
            ...step,
            distance:
                index + 1 === steps2.length
                    ? "0 km"
                    : steps2[index + 1].distance,
        }))
        .reverse();
};

const parseDistance = (steps) => {
    return steps.map((step) => ({
        ...step,
        distance: step.distance.endsWith("km")
            ? Number.parseFloat(step.distance.slice(0, -3).replace(",", ".")) *
              1000
            : Number.parseFloat(step.distance.slice(0, -2).replace(",", ".")),
    }));
};

const addIndex = (steps) => {
    return steps.map((step, index) => ({
        ...step,
        index: index + 1,
    }));
};

const addTotal = (steps) => {
    const output = steps;
    output[0].total = 0;
    for (let i = 1; i < output.length; ++i) {
        output[i].total = output[i - 1].total + output[i].distance;
    }
    return output;
};

const insertImage = (steps) => {
    return steps.map((step) => ({
        ...step,
        dir:
            "" === step.dir
                ? ""
                : new URL(browser.runtime.getURL(`./img/dirs/${step.dir}.svg`)),
    }));
};

const convertToKm = (steps) => {
    return steps.map((step) => ({
        ...step,
        distance: step.distance / 1000,
        total: step.total / 1000,
    }));
};

const addHeaders = (steps) => {
    return [
        {
            index: "Étape",
            distance: "Distance",
            total: "Cumulé",
            dir: "Direction",
            comment: "Commentaire",
            observation: "Observation",
        },
        ...steps,
    ];
};

export const writeRoadbook = (raw) => {
    let steps = [
        ...raw,
        {
            dir: "",
            distance: undefined,
            comment: "Vous êtes arrivés",
        },
    ];
    steps = shiftDistance(steps);
    steps = parseDistance(steps);
    steps = addIndex(steps);
    steps = addTotal(steps);
    steps = insertImage(steps);
    steps = convertToKm(steps);
    steps = addHeaders(steps);
    return steps;
};
