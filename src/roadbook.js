/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

/**
 * Décale les distances.
 *
 * @param {Record<string, any>[]} steps Les étapes de l'itinéraire.
 * @returns {Record<string, any>[]} Les étapes avec les distances décalées.
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

/**
 * Convertir les distances en nombre.
 *
 * @param {Record<string, any>[]} steps Les étapes de l'itinéraire.
 * @returns {Record<string, any>[]} Les étapes avec les distances en nombre.
 */
const parseDistance = (steps) => {
    return steps.map((step) => ({
        ...step,
        distance: step.distance.endsWith("km")
            ? Number.parseFloat(step.distance.slice(0, -3).replace(",", ".")) *
              1000
            : Number.parseFloat(step.distance.slice(0, -2).replace(",", ".")),
    }));
};

/**
 * Ajoute l'index de l'étape.
 *
 * @param {Record<string, any>[]} steps Les étapes de l'itinéraire.
 * @returns {Record<string, any>[]} Les étapes avec leur index.
 */
const addIndex = (steps) => {
    return steps.map((step, index) => ({
        ...step,
        index: index + 1,
    }));
};

/**
 * Ajoute les distances cumulées.
 *
 * @param {Record<string, any>[]} steps Les étapes de l'itinéraire.
 * @returns {Record<string, any>[]} Les étapes avec les distances cumulées.
 */
const addTotal = (steps) => {
    const output = steps;
    output[0].total = 0;
    for (let i = 1; i < output.length; ++i) {
        output[i].total = output[i - 1].total + output[i].distance;
    }
    return output;
};

/**
 * Insert les images des directions.
 *
 * @param {Record<string, any>[]} steps Les étapes de l'itinéraire.
 * @returns {Record<string, any>[]} Les étapes avec les images des directions.
 */
const insertImage = (steps) => {
    return steps.map((step) => ({
        ...step,
        dir:
            "" === step.dir
                ? ""
                : new URL(browser.runtime.getURL(`./img/dirs/${step.dir}.svg`)),
    }));
};

/**
 * Convertit les distances en kilomètre.
 *
 * @param {Record<string, any>[]} steps Les étapes de l'itinéraire.
 * @returns {Record<string, any>[]} Les étapes avec les distances en kilomètre.
 */
const convertToKm = (steps) => {
    return steps.map((step) => ({
        ...step,
        distance: step.distance / 1000,
        total: step.total / 1000,
    }));
};

/**
 * Ajoute les entêtes à la première position du tableau.
 *
 * @param {Record<string, any>[]} steps Les étapes de l'itinéraire.
 * @returns {Record<string, any>[]} Les étapes avec les entêtes.
 */
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

/**
 * Génère le roadbook à partir des données brutes de Google Maps.
 *
 * @param {Record<string, any>[]} raw Les étapes brutes fournies par Goole Maps.
 * @returns {Record<string, any>[]} Les étapes au bon format.
 */
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
