import {test, enforce, create, only} from "vest";
import isURL from "validator/lib/isURL.js";
import isAlphanumeric from "validator/lib/isAlphanumeric.js";

enforce.extend({ isURL, isAlphanumeric })

const suiteFile = create(({alias}) => {
    only("alias")

    test("alias", "Alias is required", () => {
        enforce(alias).isNotBlank();
    });

    test("alias", "Minimum 5 characters", () => {
        enforce(alias).longerThanOrEquals(5);
    });

    test("alias", "Maximum 30 characters", () => {
        enforce(alias).shorterThanOrEquals(30);
    });

    test("alias", "Can only contain alphanumeric", () => {
        enforce(alias).isAlphanumeric();
    });

    test("alias", "Must be a string", () => {
        enforce(alias).isString();
    });
});

export default suiteFile