/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

import { createODS } from "./opendocument.js";
import { writeRoadbook } from "./roadbook.js";

browser.pageAction.onClicked.addListener(async (tab) => {
    const injectionResults = await browser.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["content-script.js"],
    });
    const steps = writeRoadbook(injectionResults[0].result);
    const table = steps.map((step) => [
        step.index,
        step.distance,
        step.total,
        step.dir,
        step.comment,
        step.observation,
    ]);
    const file = await createODS(table);
    await browser.downloads.download({
        url: URL.createObjectURL(file),
        filename: "roadbook.fods",
    });
});

browser.downloads.onChanged.addListener(async (downloadDelta) => {
    if (
        "complete" === downloadDelta.state?.current ||
        "interrupted" === downloadDelta.state?.current
    ) {
        const downloads = await browser.downloads.search({
            id: downloadDelta.id,
        });
        for (const download of downloads) {
            if ("roadbook@regseb.github.io" === download.byExtensionId) {
                URL.revokeObjectURL(download.url);
            }
        }
    }
});
