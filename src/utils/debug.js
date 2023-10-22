export const assert = (condition, errorMessage) => {
    if (errorMessage === undefined) errorMessage = "Assertion failed";
    if (!condition) throw new Error(errorMessage);
};