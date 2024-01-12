/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

// Mettre le code dans un bloc pour que les variables soient détruites à la fin
// et qu'il n'y ait pas de problème de re-déclaration de variables constantes si
// ce script est exécuté plusieurs fois.
// eslint-disable-next-line no-lone-blocks
{
    // Retourner les données de l'itinéraire qui seront récupérées par le code
    // ayant appelé browser.scripting.executeScript().
    Array.from(document.querySelectorAll("[data-stepindex]"), (step) => {
        const dir = Array.from(step.querySelector(".dir-tt").classList.values())
            .find((c) => c.startsWith("dir-tt-"))
            .slice(7);
        const comment = Array.from(
            step.querySelectorAll('[role="button"] span[dir]'),
            (s) => s.textContent,
        ).join("");
        const distance = step.querySelector(
            ".directions-mode-distance-time",
        ).textContent;
        const observation = step.querySelector("h6")?.textContent;
        return { dir, comment, distance, observation };
    });
}
