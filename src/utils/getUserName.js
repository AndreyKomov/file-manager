export const getUserName = () => {
    console.log(process.argv);

    const userNamePrefix = '--username=';
    const userNameArg = process.argv.find((arg) => arg.includes(userNamePrefix));
    const usernamePrefixLength = userNamePrefix.split('').length;

    if (!userNameArg) {
        throw new Error(
            'Something went wrong. I might be username isn\'t provided as an argument.')
    }
    return userNameArg.slice(usernamePrefixLength, userNameArg.length);
}
