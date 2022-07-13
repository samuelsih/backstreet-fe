import {test, enforce, create, only} from "vest";
import isURL from "validator/lib/isURL.js";
import isAlphanumeric from "validator/lib/isAlphanumeric.js";

enforce.extend({ isURL, isAlphanumeric })

const suiteLink = create((data, fieldName) => {
    only(fieldName)

    test("alias", "Alias is required", () => {
        enforce(data.alias).isNotBlank();
    });

    test("alias", "Minimum 5 characters", () => {
        enforce(data.alias).longerThanOrEquals(5);
    });

    test("alias", "Maximum 30 characters", () => {
        enforce(data.alias).shorterThanOrEquals(30);
    });

    test("alias", "Can only contain alphanumeric", () => {
        enforce(data.alias).isAlphanumeric();
    });

    test("alias", "Must be a string", () => {
        enforce(data.alias).isString();
    });

    test("redirect_to", "URL is required", () => {
        enforce(data.redirect_to).isNotBlank();
    });

    test("redirect_to", "Please input valid url", () => {
        enforce(data.redirect_to).isURL();
    });

    test("redirect_to", "Must be a string", () => {
        enforce(data.redirect_to).isString();
    });
})

export default suiteLink