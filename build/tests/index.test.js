import { Edulink } from "../index.js";
console.log(process.argv);
async function main() {
    let edulinkTest = new Edulink(process.argv[2], process.argv[3], process.argv[4], 2);
    await edulinkTest.Authenticate();
    if (!edulinkTest.isAuthenticated) {
        throw new Error("Auth Error: class has not authenticated");
    }
}
try {
    main();
}
catch (error) {
    console.error(error);
}
//# sourceMappingURL=index.test.js.map