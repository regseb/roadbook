/**
 * @module
 * @license MIT
 * @author Sébastien Règne
 */

import assert from "node:assert/strict";
import { createODS } from "../../src/opendocument.js";

describe("opendocument.js", function () {
    describe("createODS()", function () {
        it("should create ODS", async function () {
            const table = [
                ["foo", 1, true],
                ["bar", 2, false],
            ];

            const ods = await createODS(table);

            assert.equal(ods.size, 1143);
            assert.equal(
                ods.type,
                "application/vnd.oasis.opendocument.spreadsheet",
            );
        });
    });
});
